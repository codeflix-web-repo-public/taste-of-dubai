<?php
/**
 * Plugin Name: GitHub Deploy Dispatch
 * Description: Notifies GitHub (repository_dispatch) whenever a post/page is published or an already-published one is updated, so the Gatsby site rebuilds automatically.
 */

if (!defined('ABSPATH')) {
    exit;
}

define('GH_DISPATCH_OWNER', 'codeflix-web-repo-public');
define('GH_DISPATCH_REPO', 'taste-of-dubai');
define('GH_DISPATCH_EVENT_TYPE', 'wp-publish');

add_action('transition_post_status', 'gh_dispatch_on_status_transition', 10, 3);

function gh_dispatch_on_status_transition($new_status, $old_status, $post) {
    if ($new_status !== 'publish') {
        return;
    }

    if (wp_is_post_autosave($post->ID) || wp_is_post_revision($post->ID)) {
        return;
    }

    // WordPress/Yoast/ACF can re-save the same post multiple times per user
    // action; debounce so one publish only triggers one rebuild.
    $lock_key = 'gh_dispatch_lock_' . $post->ID;
    if (get_transient($lock_key)) {
        return;
    }
    set_transient($lock_key, true, 30);

    gh_dispatch_trigger_rebuild();
}

function gh_dispatch_trigger_rebuild() {
    $token = defined('GH_DISPATCH_TOKEN') ? GH_DISPATCH_TOKEN : getenv('GH_DISPATCH_TOKEN');

    if (empty($token)) {
        error_log('GitHub Deploy Dispatch: GH_DISPATCH_TOKEN is not set, skipping dispatch.');
        return;
    }

    $url = sprintf(
        'https://api.github.com/repos/%s/%s/dispatches',
        GH_DISPATCH_OWNER,
        GH_DISPATCH_REPO
    );

    wp_remote_post($url, array(
        'timeout'  => 10,
        'blocking' => false, // fire-and-forget so publishing a post doesn't wait on GitHub
        'headers'  => array(
            'Authorization' => 'Bearer ' . $token,
            'Accept'        => 'application/vnd.github+json',
            'Content-Type'  => 'application/json',
            'User-Agent'    => 'taste-of-dubai-wp-dispatch',
        ),
        'body' => wp_json_encode(array(
            'event_type' => GH_DISPATCH_EVENT_TYPE,
        )),
    ));
}

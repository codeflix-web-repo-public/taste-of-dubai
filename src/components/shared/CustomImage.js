import React, { useState } from "react"

/**
 * Image component that renders webp and normal versions of image
 * @param {object} image image data from WP, sourceUrl, srcSet, sizes, altext all required
 * @param {boolean} lazy should it lazyload, defaults to true
 * @returns 
 */
export default function CustomImage({image, lazy=true, className, ...props}) {
  const [imageError, setImageError] = useState(false)
  if (!image) return null

  const sizes = `(max-width: ${image.mediaDetails.width}px) 100vw, ${image.mediaDetails.width}px`

  // create webp srcset, EWWW WP plugin / Jetpack auto generates .webp images for us.
  // So we are assuming they exist
  // Here we just append .webp to the end of the image url for each size.
  const sets = image.srcSet?.split(',')
  let webpSrcSet = ""
  sets?.map((set, i) => {
    const source = set.trim().split(' ')
    const [image, width] = source
    if (!image?.includes('.webp')) {
      webpSrcSet += `${image}.webp ${width}${i < (sets.length - 1) ? ", " : ""}`
    }
  })

  const onError = (e) => {
    // Fallback to original image if webp doesnt exist.
    setImageError(true)
    e.target.parentNode.children[0].srcset = e.target.parentNode.children[1].srcset = e.target.src
  }

  return(
    <picture> 
      {/* <source 
        type="image/webp" 
        srcSet={webpSrcSet}
        sizes={sizes}
      /> */}
      <source 
        type={image.mimeType} 
        srcSet={image.srcSet}
        sizes={sizes}
      />
      <img 
        src={image.sourceUrl}  // largest as fallback
        srcSet={image.srcSet ? image.srcSet : null}
        sizes={sizes ? sizes : null}
        alt={image.altText ? image.altText : ""}
        width={image.mediaDetails?.width ? image.mediaDetails.width : image.width}
        height={image.mediaDetails?.height ? image.mediaDetails.height : image.height}
        loading={lazy ? "lazy" : "eager"} 
        onError={!imageError ? onError : null}
        style={imageError ? { background: "#eee"} : null} // used for final fallback (no image)
        className={className}
        decoding="async"
        {...props}
      />
    </picture>
  )
}
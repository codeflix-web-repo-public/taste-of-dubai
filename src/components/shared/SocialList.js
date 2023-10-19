import styled from "styled-components"

const SocialList = styled.ul`
    padding: 0;
    margin: 0;

    li {
        padding-left: 0;
        display: inline-block;

        &:before {
            display: none;
        }
        
        a {
            color: ${props => props.theme.colors.white};
            padding: .5rem;
            text-align: center;
            font-size: 1.25rem;

            &:hover {
                color: ${props => props.theme.colors.primary};
                text-decoration: none;
            }
        }
    }
`

export default SocialList
import styled from "styled-components"

const TextBlockStyles = styled.div`
    p {
        margin-bottom: 2rem !important;

        &:last-child {
            margin: 0 !important;
        }
    }
    
    ol {
        list-style: none;
        padding: 0;
        counter-reset: my-awesome-counter;

        li {
            counter-increment: my-awesome-counter;
            padding-bottom: 1rem;

            &:last-child {
                padding-bottom: 0;
            }

            &:before {
                content: counter(my-awesome-counter) ". ";
                color: ${props => props.theme.colors.primary};
                font-family: ${props => props.theme.font.family.bold};
            }
        }
    }

    ul {
        padding-left: 0;
        list-style: none;

        li {
            padding-left: 20px;
            padding-bottom: 1rem;
            position: relative;

            &:last-child {
                padding-bottom: 0;
            }

            &:before {
                content: "";
                position: absolute;
                height: 9px;
                width: 9px;
                left: 0;
                top: .55rem;
                background-color: ${props => props.theme.colors.primary};
            }
        }
    }

`

export default TextBlockStyles
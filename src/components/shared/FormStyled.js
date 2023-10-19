import styled from "styled-components"
import { Form } from "reactstrap"

const FormStyled = styled(Form)`
    label {
        text-transform: uppercase;
        margin: 0;
        font-size: ${props => props.theme.font.size.sm};
        font-family: ${props => props.theme.font.family.bold};

        &.checkbox {
            font-family: ${props => props.theme.font.family.base};
        }
    }

    .form-control {
        height: 50px;
        border-radius: 0;
        border-color: ${props => props.theme.colors.grey2};

        &::placeholder {
            color: ${props => props.theme.colors.grey4};
        }
    }

    .form-control-file {
        font-size: ${props => props.theme.font.size.sm};
    }

    select {
        appearance: none;
    }

    svg {
        position: absolute;
        right: 1rem;
        top: .8rem;
        color: ${props => props.theme.colors.secondary};
        font-size: 1.5rem;
    }

    textarea.form-control {
        min-height: 150px;
    }

    .invalid-feedback {
        color: ${props => props.theme.colors.primary};
    }

    .form-control.is-invalid:focus {
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0;
    }
`

export default FormStyled
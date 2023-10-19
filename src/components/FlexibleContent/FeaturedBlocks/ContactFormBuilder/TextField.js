import React from "react"
import styled from "styled-components"
import { Label, FormGroup, Input, FormFeedback } from "reactstrap"
import Text from "components/shared/Text"

const FormFeedbackStyled = styled(FormFeedback)`
    text-align: right;
`

const TextField = (props) => {
    const {
        label,
        name,
        placeholder,
        required,
        size
    } = props.field

    // const name = label.replace(/\W/g, '').toLowerCase()
    const value = props.state.fields[name] && props.state.fields[name].value ? props.state.fields[name].value : ""
    const valid = required === "yes" ? props.state.validate[name] === 'has-success': false
    const invalid = required === "yes" ? props.state.validate[name] === 'has-danger' : false

    return(
        <FormGroup className="pb-3">
            <Label for={name}>
                {label}
                {required === "yes" &&
                    <Text as="span" red>*</Text>
                }
            </Label>
            <Input
                type={size === "normal" ? "text" : "textarea"}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                valid={valid}
                invalid={invalid}
                className="file-upload"
                onChange={e => {
                    props.handleChange(e)
                    if (required === "yes") props.validateRequired(e)
                }}
            />
            {required === "yes" && 
                <FormFeedbackStyled>
                    This field is required
                </FormFeedbackStyled>
            }
        </FormGroup>
    )
}

export default TextField
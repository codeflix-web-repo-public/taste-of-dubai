import React from "react"
import styled from "styled-components"
import { Label, FormGroup, Input, FormFeedback } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import Text from "components/shared/Text"

const FormFeedbackStyled = styled(FormFeedback)`
    text-align: right;
`

const DropdownButton = styled.div`
    border: 0;
    padding: 0;
    display: block;
    width: 100%;

    svg {
        color: black;
        right: 2.5rem;
    }
`

const DropdownField = (props) => {
    const {
        label,
        name,
        placeholder,
        required,
        options
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

            <DropdownButton className="position-relative">
                <Input
                    type="select"
                    name={name}
                    id={name}
                    valid={valid}
                    invalid={invalid}
                    onChange={e => {
                        props.handleChange(e)
                        if (required === "yes") props.validateRequired(e)
                    }}
                    value={value}
                >
                    <option value="">{placeholder}</option>
                    {options && options.map((option, i) => {
                        return (
                            <option
                                key={i}
                                value={option.label}
                            >
                                {option.label}
                            </option>
                        )
                    })}
                </Input>
                {required === "yes" && 
                    <FormFeedbackStyled>
                        This field is required
                    </FormFeedbackStyled>
                }
                <FontAwesomeIcon icon={faAngleDown}/>
            </DropdownButton>
        </FormGroup>
    )
}

export default DropdownField
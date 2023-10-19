import React from "react"
import styled from "styled-components"
import { Label, FormGroup, Input, FormFeedback } from "reactstrap"
import Text from "components/shared/Text"
import { Component } from "react"

const FormFeedbackStyled = styled(Text)`
    text-align: right;
    color: #F4214F;
    font-size: 80%;
`

class RadioField extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     hasValue: false
        // }
    }

    // componentDidUpdate(previousProps, previousState) {
    //     if (previousProps.state !== this.props.state) {
    //         const { name } = this.props.field
    //         const fieldState = this.props.state.fields[name]
    
    //         let hasValue = false
    
    //         fieldState && fieldState.forEach(field => {
    //             if (field.isChecked) {
    //                 hasValue = true
    //             }
    //         })
    
    //         this.setState({
    //             hasValue
    //         })
    //     }
    // }

    render() {
        const {
            label,
            name,
            required,
            options
        } = this.props.field

        return (
            <div className="pb-3">
                <Label for={name}>
                    {label}
                    {required === "yes" &&
                        <Text as="span" red>*</Text>
                    }
                </Label>
                <div>
                    {options && options.map((option, i) => {
                        const isChecked = this.props.state.fields[name] && this.props.state.fields[name].value === option.label ? true : false
                        return (
                            <FormGroup check key={i}>
                                <Label check className="checkbox">
                                    <Input
                                        type="radio"
                                        name={name}
                                        value={option.label}
                                        checked={isChecked}
                                        onChange={e => {
                                            this.props.handleChange(e)
                                            this.props.validateRequired(e)
                                        }}
                                    /> {option.label}
                                </Label>
                            </FormGroup>
                        )
                    })}
                </div>
                {required === "yes" && this.props.state.validate[name] === 'has-danger' &&
                    <FormFeedbackStyled>
                        This field is required
                    </FormFeedbackStyled>
                }
            </div>
        )
    }
}

export default RadioField
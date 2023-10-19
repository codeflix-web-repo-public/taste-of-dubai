import React from "react"
import styled from "styled-components"
import { Label, FormGroup, Input, FormText, FormFeedback } from "reactstrap"
import fileUploadImg from "images/fileUploadImg.png"
import Text from "components/shared/Text"

const FormFeedbackStyled = styled(FormFeedback)`
    text-align: right;
`

const FileUploadField = (props) => {
    const {
        label,
        name,
        required,
        requirements
    } = props.field

    // const name = label.replace(/\W/g, '').toLowerCase()
    const valid = required === "yes" ? props.state.validate[name] === 'has-success': false
    const invalid = required === "yes" ? props.state.validate[name] === 'has-danger' : false

    return (
        <FormGroup className="pb-3">
            <Label for={name}>
                {label}
                {/* <br/>
                <img src={fileUploadImg} alt="Choose file" width="38" /> 
                {props.state.fields[name] && props.state.fields[name].value.name &&
                    <span className="pl-3">{props.state.fields[name].value.name}</span>
                } */}
                {required === "yes" &&
                    <Text as="span" red>*</Text>
                }
            </Label>
            <Input 
                type="file" 
                name={name} 
                id={name} 
                valid={valid}
                invalid={invalid}
                // style={{ display: "none"}}
                onChange={e => {
                    props.handleChange(e)
                    props.validateFile(e, name)
                }}
				accept=".pdf,.jpg,.jpeg,.png,.gif,.xlsx"
            />
			{/*
				Note: W3C recommends that both file extensions AND MIME types are specified for accept attribute:
				https://html.spec.whatwg.org/multipage/input.html#attr-input-accept
				The mime types were leading to additional file extensions being added (ex: jfif andf pjpeg), so left it on just the extensions for now. Full list including mime types:
				accept=".pdf,application/pdf,.jpg,.jpeg,image/jpeg,.png,image/png,.gif,image/gif,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			*/}

            {required === "yes" && 
                <FormFeedbackStyled>
                    This field is required and must be less than 2MB. Accepted file types: pdf, jpg, png, gif, docx, xlsx
                </FormFeedbackStyled>
            }
            {requirements &&
                <FormText color="muted">
                    <div dangerouslySetInnerHTML={{ __html: requirements }} />
                </FormText>
            }
        </FormGroup>
    )
}

export default FileUploadField
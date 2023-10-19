import React from "react"
import { Table } from "reactstrap"
import styled from "styled-components"
import { media } from "utils/Media"
import { LinkSearchReplace } from "utils/LinkSearchReplace"

const TableStyled = styled(Table)`
    width: 100%;

    @media ${media.sm} {
        width: auto;
    }

    td {
        vertical-align: top;

        p {
            margin: 0 !important;
        }
    }
`

const Title = styled.h5`
    text-transform: uppercase;
    font-size: ${props => props.theme.font.size.sm};
    margin-bottom: 0.25rem;
`

const MenuTable = (props) => {
    return(
        <TableStyled>
            {props.items && props.items.map((item, i) => {
                let name = item.title ? `${item.title} &nbsp;-&nbsp; ${item.name.replace(/<\/?[^>]+(>|$)/g, "")}`  : item.name
                return(
                    <tr key={i}>
                        <td  className="pb-3">
                            <div 
                                className="font-weight-bold" 
                                dangerouslySetInnerHTML={{ __html: LinkSearchReplace(name) }} 
                            />
                            {item.description &&
                                <div dangerouslySetInnerHTML={{ __html: LinkSearchReplace(item.description) }} />
                            }
                        </td>
                        <td className="pb-3 pl-md-4">
                            <div className="font-weight-bold text-right pl-4 pl-sm-5" dangerouslySetInnerHTML={{ __html: item.price }} />
                        </td>
                    </tr>
                )
            })}
        </TableStyled>
    )
}

export default MenuTable
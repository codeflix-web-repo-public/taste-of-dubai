import React, { Component } from "react"
import { Table } from "reactstrap"
import styled, { css } from "styled-components"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

const GeneralTableWrap = styled.div`
    position: relative;
    max-width: 100%;
    width: 100%;
    padding-left: 15px;
    overflow-x: hidden;
    
    &:after {
        /* used to hide scroll bars */
        content: "";
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 25px;
        background-color: white;
        bottom: 0;
        left: 0; 
    }

    &.auto {
        width: auto;
        margin-right: 1rem;
    }
`

const ScrollContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        display: none;
    }
`

const ScrollOuter = styled.div`
    position: relative;
    &:after {
        content: "";
        position: absolute;
        right: 0;
        top: -54px;
        height: calc(100% + 54px);
        width: 30px;
        background-image: linear-gradient(to left, rgba(255, 255, 255, .9), transparent 70%);
        opacity: 1;
        transition: ${props => props.theme.transitionBase};
        display: none;
    }

    .tableOverflowed & {
        &:after {
            display: block;
        }
    }

    &.hide-white-shadow {
        &:after {
            opacity: 0;
        }
    }
`

const TableStyled = styled(Table)`
    margin: 0;
    font-family: ${props => props.theme.font.family.base};

    thead {
        background: ${props => props.theme.colors.primary};
        color: white;
    }

    th {
        font-family: ${props => props.theme.font.family.bold};
        font-size: ${props => props.theme.font.size.sm};
        text-transform: uppercase;
        padding: .5rem;

        &:first-child {
            border-right: 1px solid rgba(98, 108, 128, .2);
        }
    }
    td {
        font-weight: normal;
        padding: .5rem;

        &:first-child {
            border-right: 1px solid rgba(98, 108, 128, .2);
        }
    }

    &.table-striped tbody tr:nth-of-type(odd) {
        background-color: #eee;
    }

    p {
        margin: 0 !important;
    }
`

const Title = styled.div`
    background-color: ${props => props.theme.colors.black};
    font-family: ${props => props.theme.font.family.bold};
    color: white;
    text-align: center;
    padding: 1rem;
    max-width: 100%;
`

const TableFixed = styled(TableStyled)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    thead {
        background: transparent;
        
        th {
            text-transform: uppercase; 
            &:first-child {
                background: ${props => props.theme.colors.primary};    
            }
        }
    }
    tr {
        background-color: transparent !important;
    }
    th, td {
        opacity: 0;
        border-color: transparent !important;
        position: relative;

        &:first-child {
            opacity: 1;
            transition: ${props => props.theme.transitionBase};
        }

        &:after {
            content: "";
            position: absolute;
            left: 100%;
            top: 1px;
            width: 20px;
            height: calc(100% + 1px);
            z-index: 1;
            background-image: linear-gradient(to right, rgba(0, 0, 0, .05), transparent);
            opacity: 0;
        }

        .display-shadow & {
            &:after {
                opacity: 1;
            }
        }
    }

    td {
        background-color: white;
    }

    tbody tr:nth-of-type(odd) {
        td {
            background-color: #eee;
        }
    }
`

const ButtonStyled = styled.button`
    background-color: transparent;
    border: 0;
    height: 2rem;
    width: 2rem;
    overflow: hidden;
    font-size: 1.5rem;
    padding-left: 0;
    padding-right: 1rem;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;

    ${props => props.show && css`
        opacity: 1;
    `}
    
    ${props => props.right && css`
        padding-right: 0;
        padding-left: 1rem;
        opacity: 1;
    `}
`

const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: .5rem;
`

class GeneralTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tableOverflowed: false,
            scrolled: false
        }

        this.setTableWidth = this.setTableWidth.bind(this)
        this.sideScroll = this.sideScroll.bind(this)
        this.checkShadow = this.checkShadow.bind(this)
    } 

    componentDidMount() {
        this.setTableWidth()

        this.scrollContainer.addEventListener('scroll', this.checkShadow)
    }

    componentWillUnmount() {
        this.scrollContainer.removeEventListener('scroll', this.checkShadow, true)
    }

    setTableWidth() {
        if (this.table !== undefined) {
            const th = this.table.getElementsByTagName("th")
            let tableWidth = 0

            for (let i = 0; i < th.length; i++) {
                const thWidth = th[i].getAttribute('data-width')
                tableWidth = parseInt(tableWidth) + parseInt(thWidth)
            }

            this.table.style.width = `${tableWidth}px`
            if (this.title !== undefined) this.title.style.width = `${tableWidth}px`
            
            if (tableWidth > this.container.offsetWidth) {
                this.setState({
                    tableOverflowed: true,
                    tableWidth,
                    containerWidth: this.container.offsetWidth
                })
            }
        }
    }

    sideScroll(direction) {
        const element = this.scrollContainer
        const speed = 25
        const step = 10

        let distance = 100
        let scrollAmount = 0

        let slideTimer = setInterval(() => {
            if (direction === 'left') {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if (scrollAmount >= distance) {
                this.checkShadow()
                window.clearInterval(slideTimer);

                if (element.scrollLeft > 0) {
                    this.setState({
                        scrolled: true
                    })
                } else {
                    this.setState({
                        scrolled: false
                    })
                }
            }
        }, speed);
    }

    checkShadow() {
        if (this.tableFixed !== undefined) {
            let widthDiff = this.state.tableWidth - this.state.containerWidth
            this.scrollContainer.scrollLeft > widthDiff - 10 ? this.scrollOuter.classList.add('hide-white-shadow') : this.scrollOuter.classList.remove('hide-white-shadow')
            this.scrollContainer.scrollLeft === 0 ? this.tableFixed.classList.remove('display-shadow') : this.tableFixed.classList.add('display-shadow')
        }
    }

    render() {


        return (
            <GeneralTableWrap 
                className={classNames({
                    "pb-4": true,
                    "tableOverflowed": this.state.tableOverflowed,
                    "auto": this.props.data.tableWidth === "50"
                })}
                ref={container => this.container = container}
            >
                {this.state.tableOverflowed &&
                    <ButtonWrap>
                        <ButtonStyled show={this.state.scrolled} onClick={() => this.sideScroll('left')}><FontAwesomeIcon icon={faChevronLeft} /></ButtonStyled>
                        <ButtonStyled right onClick={() => this.sideScroll('right')}><FontAwesomeIcon icon={faChevronRight} /></ButtonStyled>
                    </ButtonWrap>
                }
                {this.props.data.title &&
                    <Title ref={title => this.title = title}>
                        {this.props.data.title}
                    </Title>
                }
                <ScrollOuter ref={scrollOuter => this.scrollOuter = scrollOuter}>
                    <ScrollContainer ref={scrollContainer => this.scrollContainer = scrollContainer}>
                        <div ref={table => this.table = table}>
                            <TableStyled
                                striped
                            >
                                <thead>
                                    <tr>
                                        {this.props.data.headingRow !== null && this.props.data.headingRow.map((row, i) => {
                                            return (
                                                <th key={i} data-width={row.columnWidth} style={{ width: `${row.columnWidth}px` }}>{row.columnName}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.data.rows !== null && this.props.data.rows.map((row, i) => {
                                        return (
                                            <tr key={i}>
                                                {row.columns.map((column, i) => {
                                                    return (
                                                        <td key={i} dangerouslySetInnerHTML={{ __html: column.columnValue }} />
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </TableStyled>
                        </div>
                    </ScrollContainer>
                    {this.state.tableOverflowed &&
                    <div ref={tableFixed => this.tableFixed = tableFixed} style={{ pointerEvents: "none", width: `${this.state.tableWidth}px` }}>
                        <TableFixed
                            striped
                            style={{ width: `${this.state.tableWidth}px` }}
                        >
                            <thead>
                                <tr>
                                    {this.props.data.headingRow !== null && this.props.data.headingRow.map((row, i) => {
                                        return (
                                            <th key={i} data-width={row.columnWidth} style={{ width: `${row.columnWidth}px` }}>{row.columnName}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.data.rows !== null && this.props.data.rows.map((row, i) => {
                                    return (
                                        <tr key={i}>
                                            {row.columns.map((column, i) => {
                                                return (
                                                    <td key={i} dangerouslySetInnerHTML={{ __html: column.columnValue }} />
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </TableFixed>
                    </div>
                    }
                </ScrollOuter>
            </GeneralTableWrap>
        )
    }
}

export default GeneralTable
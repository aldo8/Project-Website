import React from 'react';
import {InputBase,Paper} from '@material-ui/core';
import './SearchInput.scss';
import {Zoom} from 'assets/icons'

export default class SearchInput extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:'',
        }
    }
    //Handle key 'Enter' when hit value
    _handleEnterKey = event => {
        this.setState({value:event.target.value})        
        const {value} = this.state
        if (event.keyCode === 13){
            this.props.onSearch(value);
        } else {
            setTimeout(() => {
                this.props.onSearch(value)
                },1000);
        }

    }
    render(){
        const information = this.props.displayMode === 'web' ? this.props.webInfo : 'Search';
        return (
            <Paper 
                className={this.props.className || 'search-input'}
                elevation={1}
            >
            <img className='search-icon' alt='icon' src={Zoom}/>
            <InputBase
                className='search-text'
                placeholder={information}
                onKeyUp={this._handleEnterKey}
            />
            </Paper>
        )
    }
}
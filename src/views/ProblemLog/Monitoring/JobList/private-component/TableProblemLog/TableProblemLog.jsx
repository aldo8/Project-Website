import React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell,Checkbox } from '@material-ui/core';

export default class TableProblemLog extends React.PureComponent{
    render(){
        console.log('TABLE',this.props)
        const {data} = this.props;
        return(
            <>
            <Table classes={{root:'table'}}>
                <TableHead className='table-head' classes={{root:'table-head'}}>
                    <TableRow className='table-row'>
                        <TableCell padding="checkbox"/>
                        <TableCell className='table-cell'>IMPACT</TableCell>
                        <TableCell className='table-cell'>WORK ORDER</TableCell>
                        <TableCell className='table-cell'>AGING</TableCell>
                        <TableCell className='table-cell'>UNIT MODEL</TableCell>
                        <TableCell className='table-cell'>UNIT CODE</TableCell>
                        <TableCell className='table-cell'>CATEGORY</TableCell>
                        <TableCell className='table-cell'>PROBLEM</TableCell>
                        <TableCell className='table-cell'>RESPONSIBILITY</TableCell>
                        <TableCell className='table-cell'>STATUS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody classes={{root:'table-body'}}>
                    {
                        data && data.map((field) => (
                        <TableRow 
                            className='table-row'
                            onClick={() => this.props.onClick(field)}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox 
                                checked={false}
                                classes={{ checked: 'checkbox-checked' }} 
                            />
                        </TableCell>
                        <TableCell align='left' className='table-cell'>{}</TableCell>
                        <TableCell align='left' className='table-cell'>{field.WoNumber || '-'}</TableCell>
                        <TableCell align='left' className='table-cell'>{field.Age || '-'}</TableCell>
                        <TableCell align='left' className='table-cell'>{field.UnitModel || '-'}</TableCell>
                        <TableCell align='left' className='table-cell'>{field.UnitCode || '-'}</TableCell>
                        <TableCell align='left' className='table-cell'>{field.ProblemTypeName || '-'}</TableCell>
                        <TableCell align='left' className='table-cell'>{field.ProblemTypeRemarks || '-'}</TableCell>
                        <TableCell align='left' className='table-cell'>{field.ResponseTypeName || '-'}</TableCell>
                        <TableCell align='left' className='table-cell'>{field.Status || '-'}</TableCell>
                    </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            </>
        )
    }
}
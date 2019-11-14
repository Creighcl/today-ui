import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startUpdateDay } from '../actions/day';

class TheDayThat extends React.Component{
    constructor(props){
        super();
        this.state = {
            currentTdt: props.day.tdt,
            tdtSaved: true,
            tdtSaving: false
        }
        this.onFormValueChange = this.onFormValueChange.bind(this);
        this.onTDTChange = this.onTDTChange.bind(this);
        this.onTDTKeyDown = this.onTDTKeyDown.bind(this);
    }

    onFormValueChange(e) {
        var updates = {};
        updates[e.target.name] = e.target.value;
        this.setState(updates);
    };

    onTDTChange(e) {
        this.setState({tdtSaved: false});
        this.onFormValueChange(e);
    };

    onTDTKeyDown(e) {
        if (e.nativeEvent.keyCode !== 13) return;
        if (this.state.tdtSaving) return;

        this.setState({ tdtSaving: true });

        var dayUpdate = {
            tdt: this.state.currentTdt
        };

        this.props.startUpdateDay(this.props.timeStr,
                            dayUpdate)
            .then(()=>{
                this.setState({ tdtSaved: true, tdtSaving: false });
            });

    }

    render() {
        return (
            <div>
                The day that {this.state.days }<br/>
                <input 
                    type='text' 
                    name='currentTdt' 
                    className={(this.state.tdtSaved ? '' : 'unsaved') + ' ' + (this.state.tdtSaving ? 'savingText' : '')}
                    value={this.state.currentTdt } 
                    onChange={this.onTDTChange }
                    onKeyDown={this.onTDTKeyDown }
                />
            </div>
        );
    };
}

const defaultDay = {
    tdt: ''
};

const mapStateToProps = (state,ownProps) => {
    var timeStr = new moment(ownProps.dayToDisplay).format('YYYY-MM-DD');
    var day = state.days.filter(({ id }) => id === timeStr)[0] || defaultDay;

    return {
        timeStr,
        day
    };
    
};

const mapDispatchToProps = (dispatch,ownProps) => ({
   startUpdateDay: (id,updates) => dispatch(startUpdateDay(id,updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(TheDayThat);

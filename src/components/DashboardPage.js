import React from 'react';
import UserNamePlate from './UserNamePlate';
import DayDashboard from './DayDashboard';
import DayThat from './TheDayThat';

const DashboardPage = (props) => {
  var dayToDisplay = new Date();
  if (props.match.params.id){
    try{
      dayToDisplay = new Date(props.match.params.id + ' 00:00:00');
    }catch(e){}
  }
  return (<div>
    
    <UserNamePlate editingName={props.editingName}/>
    <DayDashboard dayToDisplay={dayToDisplay}/>
    <DayThat dayToDisplay={dayToDisplay}/>
    </div>
  );
}
  

export default DashboardPage;

import React from 'react';
import { connect } from 'react-redux';
import UserNameForm from './UserNameForm';
import { startUpdateUserDetails } from '../actions/userDetails';
import { firebase } from '../firebase/firebase';

export class UserNamePlate extends React.Component {
constructor(props){
    super();
    this.state = {
        editingName: false
    }
    
    this.onClickToEdit = this.onClickToEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}
    
  onSubmit({name}) {
    this.props.startUpdateUserDetails({name});
    this.setState((prevState) => {
        return { ...prevState, editingName: false }
    });
    //this.props.history.push('/');
  };

  onClickToEdit() {
    this.setState({
      editingName: true
    });
  };

  onUrplurd() {
    const ref = firebase.storage().ref();
    const file = document.querySelector('#urper').files[0]
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task.then((snapshot) => {
      const url = snapshot.downloadURL;
      this.props.startUpdateUserDetails({profileUrl:url});
      document.querySelector('#lrded').src = url;
    }).catch((error) => {
      console.error(error);
    });
  };

  render() {
        
      const notEditing = <div>
      <div className="page-header">
        <b>Name</b> 
        { this.props.userName } 
        <a className="button" onClick={this.onClickToEdit}>
            EDIT
        </a>
        
      </div>
    </div>;
    
    const editing = <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Editing Name</h1>
      </div>
    </div>
    <div className="content-container">
      <UserNameForm name={ this.props.userName } 
        onSubmit={this.onSubmit}
      />
    </div>
  </div>
    return (
        <div>
          <img className="profileThumb" id="lrded"/>
            <input id="urper" type='file'/>
            <button onClick={this.onUrplurd}>URPLURD</button>
            { this.state.editingName ? editing : notEditing }
        </div>
    );
  }
}
//MAKE USER DETAILS AVAILABLE TO DISPLAY VIA PROPS INSTEAD OF USERNAME
const mapStateToProps = (state = {userDetails:{name:"unknown"}}) => ({
        userName: state.userDetails ? state.userDetails.name || 'unknown' : 'unknown'
  });

const mapDispatchToProps = (dispatch) => ({
  startUpdateUserDetails: (updates) => dispatch(startUpdateUserDetails(updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNamePlate);

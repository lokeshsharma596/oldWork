import React from 'react';
import config from 'config';
class ModalComponents extends React.Component {
  constructor() {
    super();
  }


  render() {
    if (this.props.statemode == "delete") {
      return (

        <div className="popup customePopup popup4">
          <div className="popupPanel m-auto">
            <div className="popupHeader">
            </div>
            <div className="popupBody">
              <div className="popup1Show">
                <div className="popupImages">
                  <img src={`${config.path}/images/popup/listing.svg`} alt="" />
                </div>
                <div className="popupDetails">
                   <h5 className="popup-title">Do You Wish To Delete All The Selected Items?</h5>
                  <p className="popup-body-text">Deleting items will erase all the data related to the item.</p>
                </div>
              </div>
            </div>
            <div className="popupFooter">
              <div className="popupButton">
                <button className="popupbtn popupbtngray closePopup" onClick={this.props.modalsuccess}>Yes, Delete anyway</button> <button className="popupbtn popupbtngray" onClick={this.props.closemodal}>No, cancel request</button>
              </div>
            </div>
          </div>
        </div>


      );
    }
    if (this.props.statemode == "draft") {
      return (
        <div className="popup customePopup popup2">
          <div className="popupPanel m-auto">
            <div className="popupHeader">
            </div>
            <div className="popupBody">
              <div className="popup1Show">
                <div className="popupImages">
                  <img src={`${config.path}/images/popup/server.svg`} alt="" />
                </div>
                <div className="popupDetails">
                  <h5 className="popup-title">Do You Wish To Saved As Draft</h5>
                  <p className="card-body-text">Wait ! You are just a few steps away to complete your article! Do you still wish to continue?</p>
                </div>
              </div>
            </div>
            <div className="popupFooter">
              <div className="popupButton">
                <button className="popupbtn popupbtnblue closePopup" onClick={this.props.modalsuccess}>Yes, Save as Draft </button> <button className="popupbtn popupbtngray" onClick={this.props.closemodal}>No, continue editing</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (this.props.statemode == "publish") {
      return (
        <div className="popup customePopup popup3">
          <div className="popupPanel m-auto">
            <div className="popupHeader">
            </div>
            <div className="popupBody">
              <div className="popup1Show">
                <div className="popupImages">
                  <img src={`${config.path}/images/popup/launch-Sale.svg`} alt="" />
                </div>
                <div className="popupDetails">
                  <h4 className="popup-title">Hurray!!! Article Published Successfully </h4>
                 <p>View your articles by clicking the button below.</p>
                </div>
              </div>
            </div>
            <div className="popupFooter">
              <div className="popupButton">
                <a className="popupbtn popupbtnblue" href={this.props.param}>View in Folder</a>
              </div>
            </div>
          </div>
        </div>



      );
    }
    if (this.props.statemode == "cancel") {
      return (
        <div className="popup customePopup popup1">
          <div className="popupPanel m-auto">
            <div className="popupHeader">
            </div>
            <div className="popupBody">
              <div className="popup1Show">
                <div className="popupImages">
                  <img src={`${config.path}/images/popup/danger-sing.svg`} alt />
                </div>
                <div className="popupDetails">
                  <h5 className="popup-title">Do You Wish To Cancel All The Changes That You Made?</h5> 
                  <p className="popup-body-text">Clicking ‘Yes’ will discard all the changes made by you</p>
                </div>
              </div>
            </div>
            <div className="popupFooter">
              <div className="popupButton">
                <button className="popupbtn popupbtngray closePopup" onClick={this.props.cancelaccept}>Yes, Cancel</button> <button className="popupbtn popupbtngray" onClick={this.props.closemodal}>No, continue editing</button>
              </div>
            </div>
          </div>
        </div>


      );
    }
  }
}

export default ModalComponents;
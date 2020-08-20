import React from 'react';
import YouTube from 'react-youtube';

 
class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {

    const opts = {
      height: this.props.height,
      width: this.props.width,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
 
    return (
      
      <div class="container-fluid">
      
                <YouTube
                  // defaults -> null
                  // id={string}                       // defaults -> null
                  // className={string}                // defaults -> null
                  // containerClassName={string}       // defaults -> ''
                  // opts={obj}                        // defaults -> {}
                  // onReady={func}                    // defaults -> noop
                  // onPlay={func}                     // defaults -> noop
                  // onPause={func}                    // defaults -> noop
                  // onEnd={func}                      // defaults -> noop
                  // onError={func}                    // defaults -> noop
                  // onStateChange={func}              // defaults -> noop
                  // onPlaybackRateChange={func}       // defaults -> noop
                  // onPlaybackQualityChange={func}    // defaults -> noop
                  // videoId={this.props.videoId}
                  videoId={this.props.videoId}
                  opts={opts}
                  onReady={this._onReady}
                />

              
      </div>
      
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
 

export default (Youtube);

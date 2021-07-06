import React, {useEffect, useRef} from 'react';
import './App.css';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import {Howl} from 'howler';
// import soundURL from './assets/hey_sondn.mp3';

// var sound = new Howl({
//   src: soundURL
// }) ;

// sound.play();

function App() {
  const video = useRef();
  const moduleMobilenet = useRef();
  const classifier = useRef();
  const init = async () => {
    console.log('init...');
    await setupCamera(); 
    console.log('setup camera success !');

    // classifier.current = await mobilenet.load();
    // moduleMobilenet.current = knnClassifier.create();

    console.log('setup done');
    console.log(' Không chạm tay lên mặt và bấm train 1');
  }

  const setupCamera = () => {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia || 
      navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { video: true },
          stream => {
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata', resolve);
          },
          error => reject(error)
        );
      } else {
        reject();
      }
    });
  }

  useEffect(() => {
    init();

    //clean up
    return () => {

    }
  }, []);
  return (
    <div className="main">
      <video
        ref={video}
        className="video"
        autoPlay
      />
      <div className="control">
        <button className="btn">Train 1</button>
        <button className="btn">Train 2</button>
        <button className="btn">Run</button>
      </div>
    </div>
  );
}

export default App;

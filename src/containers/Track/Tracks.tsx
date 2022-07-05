import React, {useEffect} from 'react'

import Track from '../../components/Track'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isSoloSelector, tracksState } from '../../store/store'
import style from '../../components/Desk/style.module.css'
import { useMxContext } from "../../hooks"
import { UserInputEvents } from "../Mixdesk"

const Tracks = () => {
  const [tracks, setTracks ]= useRecoilState(tracksState)
  const hasSolo = useRecoilValue(isSoloSelector)

  const {mx, isReady, mixerChanges, onUserInput} = useMxContext()

  const toggleTrackSolo = async (trackId) => {
    if (mx.current) {
      await mx.current.soloTrack(trackId)
    }

    setTracks((tracks) => tracks.map(track => {
      if (track.id === trackId) {
        onUserInput({type: UserInputEvents.playingStateChange, value: !track.isSolo ? "solo" : null, trackId: track.id})
        return {
          ...track,
          isSolo: !track.isSolo,
        };
      }

      return track
    }))
  }

  const toggleTrack = async (trackId) => {
    if (mx.current) {
      await mx.current.toggleTrack(trackId)
    }

    setTracks((tracks) => tracks.map(track => {
      if (track.id === trackId) {
        onUserInput({type: UserInputEvents.playingStateChange, value: !track.isMuted ? "mute" : null, trackId: track.id})
        return {
          ...track,
          isMuted: !track.isMuted,
        };
      }

      return track
    }))
  }

  const toggleTrackFx = async (trackId) => {
    if (mx.current) {
      await mx.current.toggleTrackFx(trackId)
    }

    setTracks((tracks) => tracks.map(track => {
      if (track.id === trackId) {
        return {
          ...track,
          isEffectsDisabled: !track.isEffectsDisabled,
        };
      }

      return track;
    }))
  }

  const setTrackVolume = async (trackId, value) => {
    if (mx.current) {
      await mx.current.setTrackVolume(trackId, value)
    }

    setTracks((tracks) => tracks.map(track => {
      if (track.id === trackId) {
        onUserInput({type: UserInputEvents.trackVolumeChange, value: value, trackId: track.id})
        return {
          ...track,
          volume: value,
        };
      }
      return track;
    }))
  }

  const setTrackSendLevel = async (trackId, fxId, value) => {
    if (mx.current) {
      await mx.current.setTrackSendLevel(trackId, fxId, value)
    }

    setTracks((tracks) => tracks.map(track => {
      if (track.id === trackId) {
        return {
          ...track,
          send: {
            ...track.send,
            [fxId]: value,
          },
        };
      }

      return track;
    }))
  }

  const setTrackPan = async (trackId, value) => {
    if (mx.current) {
      await mx.current.setTrackPan(trackId, value)
    }

    setTracks((tracks) => tracks.map(track => {
      if (track.id === trackId) {
        onUserInput({type: UserInputEvents.panChange, value: value, trackId: track.id})
        return {
          ...track,
          pan: value,
        };
      }
      return track;
    }))
  }

  // Loading mixer state between song key changes
  useEffect(() => {
    if (mixerChanges.tracks && isReady) {
      for (const [trackId, track] of Object.entries(mixerChanges.tracks)) {
        if (track?.volume) {
          setTrackVolume(trackId, track.volume)
        }
        if (track?.pan) {
          setTrackPan(trackId, track.pan)
        }
        switch (track?.playingState) {
          case "mute":
            toggleTrack(trackId)
            break
          case "solo":
            toggleTrackSolo(trackId)
            break
          default:
            break
        }
      }
    }
  }, [mixerChanges.songKey, isReady])

  return (
    <div className={style.tracks}>
      {isReady && tracks.map((track, index) => (
        <Track
          key={track.id + index}
          {...track}
          hasSolo={hasSolo}
          onSolo={toggleTrackSolo}
          onMute={toggleTrack}
          onBypass={toggleTrackFx}
          onVolumeChange={setTrackVolume}
          onSendLevelChange={setTrackSendLevel}
          onPanChange={setTrackPan}
        />
      ))}
    </div>
  )
}

export default Tracks

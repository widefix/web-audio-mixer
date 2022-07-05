import { useRecoilValue } from 'recoil'
import { masterVolumeState } from '../../../store/playback'
import React, { useMemo } from 'react'
import style from '../style.module.css'
import Fader from '../../Fader'

const VolumeController = ({onMasterVolumeChange}) => {
  const masterVolume = useRecoilValue(masterVolumeState);

  const volumeIcon = useMemo(() => {
    if (masterVolume === 0) {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='24'
          viewBox='0 0 30 24'
        >
          <g>
            <g>
              <g>
                <path
                  fill='#fff'
                  d='M16.044 2.959v17.166L6.63 16.342H2V6.743h4.63zM0 4.743v13.599h6.243l11.801 4.742V0L6.243 4.743z'
                />
              </g>
              <g>
                <path
                  fill='#fff'
                  d='M26.291 11.542l2.674-2.674a1 1 0 0 0-1.414-1.414l-2.674 2.674-2.674-2.674a1 1 0 0 0-1.414 1.414l2.674 2.674-2.674 2.674a.999.999 0 1 0 1.414 1.414l2.674-2.674 2.674 2.674a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414z'
                />
              </g>
            </g>
          </g>
        </svg>
      )
    } else if (masterVolume > 0 && masterVolume <= 25) {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='24'
          viewBox='0 0 25 24'
        >
          <g>
            <g>
              <g>
                <path
                  fill='#fff'
                  d='M16.045 2.959v17.166L6.63 16.342H2V6.743h4.63zM0 4.743v13.599h6.243l11.802 4.742V0L6.243 4.743z'
                />
              </g>
              <g>
                <path
                  fill='#fff'
                  d='M22.166 6.628a1 1 0 0 0-1.414 1.414 4.918 4.918 0 0 1 1.451 3.5 4.92 4.92 0 0 1-1.451 3.501.999.999 0 1 0 1.414 1.414 6.903 6.903 0 0 0 2.037-4.915c0-1.855-.724-3.6-2.037-4.914z'
                />
              </g>
            </g>
          </g>
        </svg>
      )
    } else if (masterVolume > 25 && masterVolume <= 75) {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='26'
          height='24'
          viewBox='0 0 26 24'
        >
          <g>
            <g>
              <g>
                <path
                  fill='#fff'
                  d='M16.043 2.959v17.166l-9.414-3.783H2V6.743h4.629zM0 4.743v13.599h6.243l11.8 4.742V0l-11.8 4.743z'
                />
              </g>
              <g>
                <path
                  fill='#fff'
                  d='M22.166 4.319a1 1 0 1 0-1.415 1.414c3.204 3.204 3.204 8.416 0 11.62a1 1 0 0 0 1.415 1.413c3.982-3.983 3.982-10.464 0-14.447z'
                />
              </g>
            </g>
          </g>
        </svg>
      )
    } else {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30px'
          viewBox='0 0 30 25'
        >
          <defs />
          <path
            fill='#fff'
            d='M16 3.7v17.1l-9.4-3.7H2V7.5h4.6zM0 5.5V19h6.2L18 23.8V.8L6.2 5.4zM22.2 5a1 1 0 10-1.4 1.4 8.2 8.2 0 012.4 5.9 8.2 8.2 0 01-2.4 5.8 1 1 0 101.4 1.4 10.1 10.1 0 003-7.2c0-2.8-1.1-5.3-3-7.3z'
          />
          <path
            fill='#fff'
            d='M24.9.3a1 1 0 00-1.4 1.4 15 15 0 010 21.1 1 1 0 101.4 1.4 17 17 0 000-24z'
          />
        </svg>
      )
    }
  }, [masterVolume])

  return (
    <div className={style.masterVolumeContainer}>
      <div className={style.masterVolume}>{volumeIcon}</div>

      <Fader
        onChange={onMasterVolumeChange}
        isKnobThumb
        value={masterVolume}
      />
    </div>
  )
}

export default VolumeController

import { ImageResponse } from 'next/og'

export const size = {
  width: 512,
  height: 512,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #161616 0%, #0f0f0f 100%)',
          borderRadius: 96,
          border: '18px solid #a37c40',
          color: '#f8f4ec',
          fontSize: 210,
          fontWeight: 800,
          letterSpacing: '-0.08em',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        H+
      </div>
    ),
    {
      ...size,
    }
  )
}
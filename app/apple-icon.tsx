import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111111',
          borderRadius: 36,
          border: '8px solid #a37c40',
          color: '#f8f4ec',
          fontSize: 72,
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
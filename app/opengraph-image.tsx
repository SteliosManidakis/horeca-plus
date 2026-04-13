import { ImageResponse } from 'next/og'

export const alt = 'HORECA Plus'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #111111 0%, #1c1c1c 60%, #2a241b 100%)',
          color: '#f8f4ec',
          padding: '54px 64px',
          position: 'relative',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 280,
            height: 280,
            borderBottomLeftRadius: 280,
            background: 'rgba(163, 124, 64, 0.18)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#c79a4f',
                marginBottom: 28,
              }}
            >
              HORECA PLUS
            </div>

            <div
              style={{
                fontSize: 72,
                lineHeight: 1.02,
                fontWeight: 800,
                maxWidth: 880,
                letterSpacing: '-0.05em',
                marginBottom: 24,
              }}
            >
              Strategic support for hospitality and tourism businesses
            </div>

            <div
              style={{
                fontSize: 28,
                lineHeight: 1.45,
                color: 'rgba(248, 244, 236, 0.88)',
                maxWidth: 860,
              }}
            >
              Costing • Operations • Procurement • Training • Business Control
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div
              style={{
                height: 2,
                width: 220,
                background: '#a37c40',
              }}
            />

            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#f8f4ec',
              }}
            >
              horeca-plus.gr
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
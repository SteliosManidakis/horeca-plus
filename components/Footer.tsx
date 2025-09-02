type Props = { messages: any }
export default function Footer({ messages }: Props) {
  return (
    <footer style={{padding:'24px', borderTop:'1px solid #eee', marginTop:48, textAlign:'center', fontSize:14, color:'#666'}}>
      {messages.footer.copyright}
    </footer>
  )
}

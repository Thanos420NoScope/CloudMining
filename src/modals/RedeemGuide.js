import React from 'react'
import { Button, Header, Image, Modal, Label, Divider } from 'semantic-ui-react'

function ModalExampleModal() {
  const [open, setOpen] = React.useState(true)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>
        <p>BETA, USE AT YOUR OWN RISK<Label as='a' color='red' tag> Warning </Label></p>
      </Modal.Header>
      <Modal.Content>
        <h4>Dont forget to open the Zel server</h4>
        <Modal.Description>
          <p>Top right of the Zel wallet, enable server to connect to DAPPS</p>
          <Divider/>
          <h4>LOW liquidity</h4>
          <p>Make sure to trade very small amounts</p>
          <Divider/>
          <h4>Not responsible for any loss</h4>
          <p>This is still in early stage</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='teal' onClick={() => setOpen(false)}>
          Got it
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal

import { Room, Client } from '@colyseus/core'
import { BasicSchema } from './schema/BasicSchema'

export class MyRoom extends Room<BasicSchema> {
    onCreate(options: any) {
        this.setState(new BasicSchema())

        this.setPatchRate(100)
        this.maxClients = 32

        // this.onMessage('ping', (client) => {
        //     console.log(client.sessionId, "pong")
        // })

        // this.onMessage("updatePosition", (client, data) => {
        //     const position = this.state.positions.get(client.sessionId)

        //     position.positionX = data.position.x
        //     position.positionY = data.position.y
        //     position.positionZ = data.position.z
    
        //     position.rotationX = data.rotation.x
        //     position.rotationY = data.rotation.y
        //     position.rotationZ = data.rotation.z
        //     position.rotationW = data.rotation.w
        // })

        // this.onMessage('updatePlayerState', (client, data) => {
        //     const playerState = this.state.playerStates.get(client.sessionId);

        //     playerState.nickname = data.nickname
        //     playerState.avatarModelName = data.avatarModelName
        //     playerState.action = data.action
        // })
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, 'joined!')

        // const position = new Position()

        // console.log(options)

        // position.positionX = options.position.x
        // position.positionY = options.position.y
        // position.positionZ = options.position.z

        // position.rotationX = 0
        // position.rotationY = 0
        // position.rotationZ = 0
        // position.rotationW = 0

        // this.state.positions.set(client.sessionId, position)


        // const playerState = new PlayerState()

        // playerState.nickname = options.params.nickname
        // playerState.avatarModelName = options.params.avatarModelName
        // playerState.action = options.params.action

        // this.state.playerStates.set(client.sessionId, playerState)
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, 'left!')
        // this.state.positions.delete(client.sessionId)
        // this.state.playerStates.delete(client.sessionId)
    }

    onDispose() {
        console.log('room', this.roomId, 'disposing...')
    }
}

import { Room, Client } from '@colyseus/core'
import { BasicSchema, PlayerActions, PlayerSettings, PlayerState } from './schema/BasicSchema';

export class MyRoom extends Room<BasicSchema> {
    onCreate(options: any) {
        this.setState(new BasicSchema())
        this.setPatchRate(100)
        this.maxClients = 32

        this.onMessage("updateState", (client, data) => {
            const playerState = this.state.playerState.get(client.sessionId)

            playerState.posX = data.posX
            playerState.posY = data.posY
            playerState.posZ = data.posX
            playerState.rotY = data.rotY
            playerState.teleport = data.teleport
        })

        this.onMessage('updateActions', (client, data) => {
            const playerActions = this.state.playerActions.get(client.sessionId);
            playerActions.animation = data.animation
            playerActions.emoji = data.emoji
        })

        this.onMessage('updateSettings', (client, data) => {
            const playerSettings = this.state.playerSettings.get(client.sessionId);
            playerSettings.nickname = data.nickname
            playerSettings.avatarId = data.avatarId
        })
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, 'joined!', options)

        const playerState = new PlayerState()
        playerState.posX = options.playerState?.posX ?? 0
        playerState.posY = options.playerState?.posY ?? 0
        playerState.posZ = options.playerState?.posX ?? 0
        playerState.rotY = options.playerState?.rotY ?? 0
        playerState.teleport = options.playerState?.teleport ?? false

        const playerActions = new PlayerActions()
        playerActions.animation = options.playerActions?.animation ?? 0
        playerActions.emoji = options.playerActions?.emoji ?? 0

        const playerSettings = new PlayerSettings()
        playerSettings.nickname = options.playerSettings?.nickname ?? ''
        playerSettings.avatarId = options.playerSettings?.avatarId ?? ''


        this.state.playerState.set(client.sessionId, playerState)
        this.state.playerActions.set(client.sessionId, playerActions)
        this.state.playerSettings.set(client.sessionId, playerSettings)
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, 'left!')
        this.state.playerState.delete(client.sessionId)
        this.state.playerActions.delete(client.sessionId)
        this.state.playerSettings.delete(client.sessionId)
    }

    onDispose() {
        console.log('room', this.roomId, 'disposing...')
    }
}

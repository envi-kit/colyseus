import { MapSchema, Schema, type } from '@colyseus/schema';


export class PlayerState extends Schema {
    @type('number') posX: number
    @type('number') posY: number
    @type('number') posZ: number
    @type('number') rotY: number
    @type('boolean') teleport: boolean
}

export class PlayerActions extends Schema {
    @type('number') animation: number
    @type('number') emoji: number
}

export class PlayerSettings extends Schema {
    @type('string') nickname: string
    @type('string') avatarId: string
}

export class BasicSchema extends Schema {
    @type({ map: PlayerState }) playerState = new MapSchema<PlayerState>()
    @type({ map: PlayerActions }) playerActions = new MapSchema<PlayerActions>()
    @type({ map: PlayerSettings }) playerSettings = new MapSchema<PlayerSettings>()
}

import { MapSchema, Schema, type } from '@colyseus/schema'


export class Position extends Schema {
    @type('number') positionX: number
    @type('number') positionY: number
    @type('number') positionZ: number
    @type('number') rotationX: number
    @type('number') rotationY: number
    @type('number') rotationZ: number
    @type('number') rotationW: number
}

export class PlayerState extends Schema {
    @type('string') nickname: string
    @type('string') avatarModelName: string
    @type('string') action: string
}

export class BasicSchema extends Schema {
    // @type({ map: Player }) players = new MapSchema<Player>()
    @type({ map: Position }) positions = new MapSchema<Position>()
    @type({ map: PlayerState }) playerStates = new MapSchema<PlayerState>()
}

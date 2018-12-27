import Config from './Config.js'
const TILE_SIZE = Config.TILE_SIZE

const Avatar = (stage, user) => {
  const avatar = new window.createjs.Shape()
  avatar.x = user.x * TILE_SIZE
  avatar.y = user.y * TILE_SIZE
  avatar.graphics.beginStroke(user.color).beginFill(user.color).drawRect(
    0, 0, TILE_SIZE, TILE_SIZE
  )
  stage.addChild(avatar)
  return avatar
}

const User = (stage, user) => {
  user.avatar = Avatar(stage, user)
  user.moveTo = (x, y) => {
    user.x = x
    user.y = y
    user.avatar.x = user.x * TILE_SIZE
    user.avatar.y = user.y * TILE_SIZE
    stage.update()
  }
  return user
}

export default User

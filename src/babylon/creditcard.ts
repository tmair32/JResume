const drawCardNumber = (mesh: InstanceType<typeof AbstractMesh>) => {
  const font = 'bold 100px serif'
  const cardNumber = '1234 5678 9012 3456'
  const textureResolution = 512
  const textureGround = new DynamicTexture(
    'texture',
    textureResolution,
    mesh.getScene(),
    true,
  )

  textureGround.hasAlpha = true
  textureGround.uAng = Math.PI

  textureGround.drawText(
    cardNumber,
    200,
    300,
    font,
    'black',
    'white',
    true,
    true,
  )

  const material = new StandardMaterial('texture', mesh.getScene())
  material.diffuseTexture = textureGround
}

export const drawCreditCard = (scene: InstanceType<typeof Scene>) => {
  SceneLoader.ImportMesh(
    '',
    `${import.meta.env.BASE_URL}creditcard/`,
    // `${import.meta.env.VITE_CDN_URL}creditcard/`,
    'scene.gltf',
    scene,
    (meshes) => {
      const card = meshes[1]
      // drawCardNumber(card)
    },
  )
}

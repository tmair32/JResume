const rotateCard = (mesh: InstanceType<typeof AbstractMesh>) => {
  mesh.rotation = new Vector3(0, Math.PI / 1.8, 0)
  mesh.position = new Vector3(-Math.PI, 0, 0)

  const scene = mesh.getScene()

  const rotateSpeed = ref(0.03)

  scene.registerAfterRender(() => {
    mesh.rotateAround(new Vector3(0, 0, 16), Axis.Z, rotateSpeed.value)
    mesh.actionManager = new ActionManager(scene)
    mesh.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnPickTrigger,
        },
        () => {
          rotateSpeed.value = rotateSpeed.value === 0 ? 0.03 : 0
        },
      ),
    )
  })
}

const drawCardLine = (mesh: InstanceType<typeof AbstractMesh>) => {
  const boundingVector = mesh.getHierarchyBoundingVectors()
  const size = {
    x: boundingVector.max.x - boundingVector.min.x,
    y: boundingVector.max.y - boundingVector.min.y,
    z: boundingVector.max.z - boundingVector.min.z,
  }

  const cardLineMaterial = new StandardMaterial('cardLineMaterial', mesh.getScene())
  cardLineMaterial.diffuseColor = new Color3(1, 1, 1)
  cardLineMaterial.emissiveColor = new Color3(1, 1, 1)
  cardLineMaterial.specularColor = new Color3(1, 1, 1)
  cardLineMaterial.ambientColor = new Color3(1, 1, 1)

  const cardLinePlane = MeshBuilder.CreatePlane(
    'cardLinePlane',
    {
      width: size.x,
      height: size.y / 6,
    },
    mesh.getScene(),
  )

  cardLinePlane.material = cardLineMaterial

  cardLinePlane.position = new Vector3(
    boundingVector.min.x + size.x / 2,
    boundingVector.min.y + size.y / 1.35,
    boundingVector.min.z - 0.01,
  )
}

const drawLineCat = (mesh: InstanceType<typeof AbstractMesh>) => {
  const light1 = new HemisphericLight('light1', new Vector3(1, 1, -10), mesh.getScene())
  const light2 = new PointLight('light2', new Vector3(-2, -6, -3), mesh.getScene())

  light1.intensity = 1
  light2.intensity = 1
  light2.diffuse = new Color3(1, 1, 1)
  light2.specular = new Color3(1, 1, 1)

  const catMaterial = new StandardMaterial('catMaterial')
  catMaterial.diffuseTexture = new Texture(
    `${import.meta.env.BASE_URL}Cat.png`,
  )
  catMaterial.diffuseTexture.hasAlpha = true

  const catPlane = MeshBuilder.CreatePlane(
    'catPlane',
    {
      width: 3,
      height: 3,
    },
    mesh.getScene(),
  )
  catPlane.material = catMaterial
  catPlane.position = new Vector3(1.8, -2.4, -0.06)
  catPlane.rotation = new Vector3(0, 0, Math.PI / 18)

  catPlane.setParent(mesh)
  mesh.addChild(catPlane)
}

const drawChip = (mesh: InstanceType<typeof AbstractMesh>) => {
  const chipMaterial = new StandardMaterial('chipMaterial')
  chipMaterial.diffuseTexture = new Texture(
    `${import.meta.env.BASE_URL}Chip.png`,
  )
  chipMaterial.diffuseTexture.hasAlpha = true

  const chipPlane = MeshBuilder.CreatePlane(
    'chipPlane',
    {
      width: 2,
      height: 2,
    },
    mesh.getScene(),
  )
  chipPlane.material = chipMaterial
  chipPlane.position = new Vector3(0, 2.3, -0.04)
  chipPlane.rotation = new Vector3(0, 0, Math.PI / 1.8)

  chipPlane.setParent(mesh)
  mesh.addChild(chipPlane)
}

const drawText = (mesh: InstanceType<typeof AbstractMesh>) => {
  const textTexture = new DynamicTexture(
    'textTexture',
    {
      width: 240,
      height: 60,
    },
  )
  const textTextureCtx = textTexture.getContext()
  const textWidth = textTextureCtx.measureText('Amor Fati').width
  const ratio = textWidth / 12
  const fontSize = Math.floor(180 / (ratio * 1))

  const textMaterial = new StandardMaterial('textMaterial')
  textMaterial.diffuseTexture = textTexture
  textMaterial.diffuseTexture.hasAlpha = true

  textTexture.drawText(
    'Amor Fati',
    null,
    null,
    `bold ${fontSize}px Zeyada`,
    'black',
    'transparent',
  )

  const textPlane = MeshBuilder.CreatePlane(
    'textPlane',
    {
      width: 4,
      height: 1,
    },
    mesh.getScene(),
  )
  textPlane.material = textMaterial
  textPlane.position = new Vector3(-1.5, 0.6, -0.04)
  textPlane.rotation = new Vector3(0, 0, -Math.PI / 2.3)

  textPlane.setParent(mesh)
  mesh.addChild(textPlane)
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
      rotateCard(card)
      drawLineCat(card)
      drawChip(card)
      drawText(card)
    },
  )
}

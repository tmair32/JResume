const rotateCard = (mesh: InstanceType<typeof AbstractMesh>) => {
  mesh.rotation = new Vector3(0, Math.PI / 1.8, 0)
  mesh.position = new Vector3(-Math.PI, 0, 0)

  const scene = mesh.getScene()

  scene.registerAfterRender(() => {
    mesh.rotateAround(new Vector3(0, 0, 16), Axis.Z, Math.PI / 100)
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
  catPlane.position = new Vector3(1.3, -1, -0.06)
  catPlane.rotation = new Vector3(0, 0, Math.PI / 18)

  catPlane.setParent(mesh)
  mesh.addChild(catPlane)
}

// const drawCVC = (mesh: InstanceType<typeof AbstractMesh>) => {

// }

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
    },
  )
}

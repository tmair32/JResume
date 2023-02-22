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

const drawCVC = (mesh: InstanceType<typeof AbstractMesh>) => {

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
      drawCardLine(card)
      drawCVC(card)
    },
  )
}

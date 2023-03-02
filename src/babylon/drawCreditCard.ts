export const rotateCard = (mesh: InstanceType<typeof AbstractMesh>) => {
  mesh.rotation = new Vector3(0, Math.PI / 1.8, 0)
  mesh.position = new Vector3(-Math.PI, 0, 0)

  const scene = mesh.getScene()

  const rotateSpeed = ref(0.03)

  scene.registerAfterRender(() => {
    mesh.rotateAround(new Vector3(0, 0, 16), Axis.Z, rotateSpeed.value)
    mesh.actionManager = new ActionManager(scene)
    mesh.actionManager.isRecursive = true
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

export const drawLight = (mesh: InstanceType<typeof AbstractMesh>) => {
  const light1 = new HemisphericLight('light1', new Vector3(1, 1, -10), mesh.getScene())

  light1.intensity = 1
  return light1
}

export const drawCardLine = (mesh: InstanceType<typeof AbstractMesh>) => {
  const scene = mesh.getScene()

  const boundingVector = mesh.getHierarchyBoundingVectors()
  const size = {
    x: boundingVector.max.x - boundingVector.min.x,
    y: boundingVector.max.y - boundingVector.min.y,
    z: boundingVector.max.z - boundingVector.min.z,
  }

  const cardLineMaterial = new StandardMaterial('cardLineMaterial', scene)
  cardLineMaterial.diffuseColor = new Color3(0, 0, 0)
  cardLineMaterial.alpha = 0.8

  const cardLinePlane = MeshBuilder.CreatePlane(
    'cardLinePlane',
    {
      width: size.y - 0.8,
      backUVs: new Vector4(1, 1, 1, 1),
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene,
  )

  cardLinePlane.material = cardLineMaterial
  cardLinePlane.rotation = new Vector3(0, 0, Math.PI / 2 + 0.17)
  cardLinePlane.position = new Vector3(2, -0.2, 0.04)

  cardLinePlane.setParent(mesh)
  mesh.addChild(cardLinePlane)

  return cardLinePlane
}

export const drawLineCat = (mesh: InstanceType<typeof AbstractMesh>) => {
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

  return catPlane
}

export const drawChip = (mesh: InstanceType<typeof AbstractMesh>) => {
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

  return chipPlane
}

export const drawText = (mesh: InstanceType<typeof AbstractMesh>) => {
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

  return textPlane
}

export const drawSignature = (mesh: InstanceType<typeof AbstractMesh>) => {
  const signatureMaterial = new StandardMaterial('signatureMaterial')
  signatureMaterial.diffuseTexture = new Texture(
    `${import.meta.env.BASE_URL}Signature.png`,
  )
  signatureMaterial.diffuseTexture.hasAlpha = true

  const signaturePlane = MeshBuilder.CreatePlane(
    'signaturePlane',
    {
      width: 2,
      height: 1,
      backUVs: new Vector4(0, 0, 1, 1),
      sideOrientation: Mesh.DOUBLESIDE,
    },
    mesh.getScene(),
  )
  signaturePlane.material = signatureMaterial
  signaturePlane.position = new Vector3(-0.2, 1.3, 0.05)
  signaturePlane.rotation = new Vector3(0, Math.PI, 0)

  signaturePlane.setParent(mesh)
  mesh.addChild(signaturePlane)

  return signaturePlane
}

export const drawSignaturePlane = (mesh: InstanceType<typeof AbstractMesh>) => {
  const signaturePlaneMaterial = new StandardMaterial('signaturePlaneMaterial')

  signaturePlaneMaterial.diffuseColor = new Color3(1, 1, 1)

  const signaturePlane = MeshBuilder.CreatePlane(
    'signaturePlane',
    {
      width: 3,
      height: 1,
      backUVs: new Vector4(0, 0, 1, 1),
      sideOrientation: Mesh.DOUBLESIDE,
    },
    mesh.getScene(),
  )
  signaturePlane.material = signaturePlaneMaterial
  signaturePlane.position = new Vector3(-0.7, 1.2, 0.04)
  signaturePlane.rotation = new Vector3(0, Math.PI, 3)

  signaturePlane.setParent(mesh)
  mesh.addChild(signaturePlane)

  const light = new PointLight('light', new Vector3(0, -0.7, -5), mesh.getScene())
  light.diffuse = new Color3(1, 1, 1)
  light.specular = new Color3(1, 1, 1)
  light.intensity = 1.2
  light.parent = signaturePlane
  light.includedOnlyMeshes = [signaturePlane]

  return signaturePlane
}

export const drawCVC = (mesh: InstanceType<typeof AbstractMesh>) => {
  const textTexture = new DynamicTexture(
    'textTexture',
    {
      width: 60,
      height: 24,
    },
  )
  const textTextureCtx = textTexture.getContext()
  const textWidth = textTextureCtx.measureText('313').width
  const ratio = textWidth / 3
  const fontSize = Math.floor(180 / (ratio * 1.3))

  const textMaterial = new StandardMaterial('textMaterial')
  textMaterial.diffuseTexture = textTexture
  textMaterial.diffuseTexture.hasAlpha = true

  textTexture.drawText(
    '313',
    null,
    null,
    `normal ${fontSize}px Zeyada`,
    'silver',
    'transparent',
  )

  const textPlane = MeshBuilder.CreatePlane(
    'textPlane',
    {
      width: 1,
      height: 0.4,
      backUVs: new Vector4(0, 0, 1, 0.5),
      sideOrientation: Mesh.DOUBLESIDE,
    },
    mesh.getScene(),
  )
  textPlane.material = textMaterial
  textPlane.position = new Vector3(-1.8, 1, 0.05)
  textPlane.rotation = new Vector3(0, Math.PI, -0.2)

  textPlane.setParent(mesh)
  mesh.addChild(textPlane)

  const light = new PointLight('light', new Vector3(0, 1.5, -5), mesh.getScene())
  light.diffuse = new Color3(1, 1, 1)

  light.intensity = 1
  light.parent = textPlane
  light.includedOnlyMeshes = [textPlane]

  return textPlane
}

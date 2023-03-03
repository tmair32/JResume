import {
  drawCVC,
  drawCardLine,
  drawChip,
  drawLight,
  drawLineCat,
  drawSignature,
  drawSignaturePlane,
  drawText,
  rotateCard,
} from './drawCreditCard'

export const drawCreditCard = (scene: InstanceType<typeof Scene>) => {
  SceneLoader.ImportMesh(
    '',
    `${import.meta.env.BASE_URL}creditcard/`,
    // `${import.meta.env.VITE_CDN_URL}creditcard/`,
    'scene.gltf',
    scene,
    (meshes) => {
      const card = meshes[1]
      const light = drawLight(card)
      rotateCard(card)
      drawLineCat(card)
      drawChip(card)
      drawText(card)

      const cardLine = drawCardLine(card)
      const signature = drawSignature(card)
      const signaturePlane = drawSignaturePlane(card)
      const cvc = drawCVC(card)

      light.excludedMeshes.push(cardLine)
      light.excludedMeshes.push(signature)
      light.excludedMeshes.push(signaturePlane)
      light.excludedMeshes.push(cvc)
    },
  )
}

export function createElement(x1, y1, x2, y2, type, id, stroke, background) {
  const element = {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    type: type,
    id: id,
    stroke: stroke,
    background: background
  }

  switch (type) {
    case "line":
    case "rectangle":
      return element;
    case "pencil":
      const points = [];
      delete element.type;
      delete element.id;
      points.push(element);
      return { type: type, points: points, id: id };
    default:
      throw new Error("type not found");
  }
}

export function findElement(x, y, elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.type === "pencil") continue;

    const { x1, y1, x2, y2, type } = element;

    if (type === "line") {
      const point = distance(x1, y1, x2, y2) - (distance(x1, y1, x, y) + distance(x2, y2, x, y))
      if (Number(Math.abs(point).toFixed(1)) < 0.2) return element;
    } else if (type === "rectangle") {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      if (x >= minX && x <= maxX && y >= minY && y <= maxY)
        return element;
    }
  }

  return null;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}

export function drawElement(element, context) {
  switch (element.type) {
    case "line":
      context.strokeStyle = element.stroke;
      context.beginPath();
      context.moveTo(element.x1, element.y1);
      context.lineTo(element.x2, element.y2);
      context.stroke();
      break;
    case "rectangle":
      const width = element.x2 - element.x1;
      const height = element.y2 - element.y1;

      if (element.background === "none") {
        context.strokeStyle = element.stroke;
        context.strokeRect(element.x1, element.y1, width, height);
      } else {
        context.fillStyle = element.background;
        context.fillRect(element.x1, element.y1, width, height);
      }
      break;
    case "pencil":
      const { points } = element;
      points.forEach(point => {
        const { x1, y1, x2, y2 } = point;
        context.lineWidth = 2;
        context.strokeStyle = "white"
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      });
      break;
    default:
      throw new Error("type not found");
  }
}

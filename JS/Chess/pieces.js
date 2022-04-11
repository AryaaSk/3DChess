"use strict";
const setColour = (body, colour) => {
    for (let i = 0; i != body.faces.length; i += 1) {
        body.faces[i].colour = colour;
    }
};
//OBJECTS
//when building the shape, center on x and z, but not on y, the whole piece should sit on the y-axis
class SampleObject extends Shape {
    constructor() {
        super();
        this.pointMatrix = new matrix();
        const points = [[0, 0, 0], [100, 0, 0], [50, 0, 100], [50, 100, 50]];
        for (let i = 0; i != points.length; i += 1) {
            this.pointMatrix.addColumn(points[i]);
        }
        const [centeringX, centeringY, centeringZ] = [-50, 0, -50];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);
        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{ pointIndexes: [0, 1, 2], colour: "#ff0000" }, { pointIndexes: [0, 1, 3], colour: "#ff9300" }, { pointIndexes: [1, 2, 3], colour: "#00f900" }, { pointIndexes: [2, 3, 0], colour: "#0433ff" }];
    }
}
class PawnObject extends Shape {
    constructor() {
        super();
        this.pointMatrix = new matrix();
        const points = [[-15, 79.375, 5], [-5, 79.375, 15], [5, 79.375, 15], [15, 79.375, 5], [15, 79.375, -5], [5, 79.375, -15], [-5, 79.375, -15], [-15, 79.375, -5], [-21, 87.625, 7], [-7, 87.625, 21], [7, 87.625, 21], [21, 87.625, 7], [21, 87.625, -7], [7, 87.625, -21], [-7, 87.625, -21], [-21, 87.625, -7], [-25, 95.875, 8.4], [-8.4, 95.875, 25], [8.4, 95.875, 25], [25, 95.875, 8.4], [25, 95.875, -8.4], [8.4, 95.875, -25], [-8.4, 95.875, -25], [-25, 95.875, -8.4], [-21, 112.375, 7], [-7, 112.375, 21], [7, 112.375, 21], [21, 112.375, 7], [21, 112.375, -7], [7, 112.375, -21], [-7, 112.375, -21], [-21, 112.375, -7], [-15, 120.625, 5], [-5, 120.625, 15], [5, 120.625, 15], [15, 120.625, 5], [15, 120.625, -5], [5, 120.625, -15], [-5, 120.625, -15], [-15, 120.625, -5], [-25, 104.125, 8.4], [-8.4, 104.125, 25], [8.4, 104.125, 25], [25, 104.125, 8.4], [25, 104.125, -8.4], [8.4, 104.125, -25], [-8.4, 104.125, -25], [-25, 104.125, -8.4], [0, 73.875, 0], [0, 126.125, 0], [-30, 0, 30], [30, 0, 30], [30, 0, -30], [-30, 0, -30], [-30, 10, 30], [30, 10, 30], [30, 10, -30], [-30, 10, -30], [-25, 20, 25], [25, 20, 25], [25, 20, -25], [-25, 20, -25], [-10, 35, 10], [10, 35, 10], [10, 35, -10], [-10, 35, -10]];
        for (let i = 0; i != points.length; i += 1) {
            this.pointMatrix.addColumn(points[i]);
        }
        const [centeringX, centeringY, centeringZ] = [0, 0, 0];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);
        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{ pointIndexes: [0, 8, 15, 7], colour: "#c4c4c4" }, { pointIndexes: [7, 6, 14, 15], colour: "#c4c4c4" }, { pointIndexes: [6, 5, 13, 14], colour: "#c4c4c4" }, { pointIndexes: [5, 4, 12, 13], colour: "#c4c4c4" }, { pointIndexes: [4, 3, 11, 12], colour: "#c4c4c4" }, { pointIndexes: [3, 2, 10, 11], colour: "#c4c4c4" }, { pointIndexes: [2, 1, 9, 10], colour: "#c4c4c4" }, { pointIndexes: [1, 0, 8, 9], colour: "#c4c4c4" }, { pointIndexes: [9, 8, 16, 17], colour: "#c4c4c4" }, { pointIndexes: [8, 15, 23, 16], colour: "#c4c4c4" }, { pointIndexes: [15, 14, 22, 23], colour: "#c4c4c4" }, { pointIndexes: [14, 13, 21, 22], colour: "#c4c4c4" }, { pointIndexes: [13, 12, 20, 21], colour: "#c4c4c4" }, { pointIndexes: [12, 11, 19, 20], colour: "#c4c4c4" }, { pointIndexes: [11, 10, 18, 19], colour: "#c4c4c4" }, { pointIndexes: [10, 9, 17, 18], colour: "#c4c4c4" }, { pointIndexes: [18, 17, 41, 42], colour: "#c4c4c4" }, { pointIndexes: [17, 16, 40, 41], colour: "#c4c4c4" }, { pointIndexes: [16, 23, 47, 40], colour: "#c4c4c4" }, { pointIndexes: [23, 22, 46, 47], colour: "#c4c4c4" }, { pointIndexes: [22, 21, 45, 46], colour: "#c4c4c4" }, { pointIndexes: [21, 20, 44, 45], colour: "#c4c4c4" }, { pointIndexes: [20, 19, 43, 44], colour: "#c4c4c4" }, { pointIndexes: [19, 18, 42, 43], colour: "#c4c4c4" }, { pointIndexes: [44, 28, 27, 43], colour: "#c4c4c4" }, { pointIndexes: [43, 27, 26, 42], colour: "#c4c4c4" }, { pointIndexes: [42, 26, 25, 41], colour: "#c4c4c4" }, { pointIndexes: [41, 25, 24, 40], colour: "#c4c4c4" }, { pointIndexes: [40, 24, 31, 47], colour: "#c4c4c4" }, { pointIndexes: [47, 31, 30, 46], colour: "#c4c4c4" }, { pointIndexes: [46, 30, 29, 45], colour: "#c4c4c4" }, { pointIndexes: [45, 29, 28, 44], colour: "#c4c4c4" }, { pointIndexes: [30, 29, 37, 38], colour: "#c4c4c4" }, { pointIndexes: [29, 28, 36, 37], colour: "#c4c4c4" }, { pointIndexes: [28, 27, 35, 36], colour: "#c4c4c4" }, { pointIndexes: [27, 26, 34, 35], colour: "#c4c4c4" }, { pointIndexes: [26, 25, 33, 34], colour: "#c4c4c4" }, { pointIndexes: [25, 24, 32, 33], colour: "#c4c4c4" }, { pointIndexes: [24, 31, 39, 32], colour: "#c4c4c4" }, { pointIndexes: [31, 30, 38, 39], colour: "#c4c4c4" }, { pointIndexes: [7, 48, 6], colour: "#c4c4c4" }, { pointIndexes: [6, 48, 5], colour: "#c4c4c4" }, { pointIndexes: [5, 48, 4], colour: "#c4c4c4" }, { pointIndexes: [4, 48, 3], colour: "#c4c4c4" }, { pointIndexes: [3, 48, 2], colour: "#c4c4c4" }, { pointIndexes: [2, 48, 1], colour: "#c4c4c4" }, { pointIndexes: [1, 48, 0], colour: "#c4c4c4" }, { pointIndexes: [0, 48, 7], colour: "#c4c4c4" }, { pointIndexes: [38, 49, 39], colour: "#c4c4c4" }, { pointIndexes: [49, 38, 37], colour: "#c4c4c4" }, { pointIndexes: [37, 49, 36], colour: "#c4c4c4" }, { pointIndexes: [36, 49, 35], colour: "#c4c4c4" }, { pointIndexes: [35, 49, 34], colour: "#c4c4c4" }, { pointIndexes: [34, 49, 33], colour: "#c4c4c4" }, { pointIndexes: [33, 49, 32], colour: "#c4c4c4" }, { pointIndexes: [49, 32, 39], colour: "#c4c4c4" }, { pointIndexes: [62, 65, 7, 1], colour: "#c4c4c4" }, { pointIndexes: [65, 64, 5, 7], colour: "#c4c4c4" }, { pointIndexes: [64, 63, 3, 5], colour: "#c4c4c4" }, { pointIndexes: [63, 62, 1, 3], colour: "#c4c4c4" }, { pointIndexes: [59, 58, 62, 63], colour: "#c4c4c4" }, { pointIndexes: [58, 61, 65, 62], colour: "#c4c4c4" }, { pointIndexes: [61, 60, 64, 65], colour: "#c4c4c4" }, { pointIndexes: [60, 59, 63, 64], colour: "#c4c4c4" }, { pointIndexes: [56, 55, 59, 60], colour: "#c4c4c4" }, { pointIndexes: [55, 54, 58, 59], colour: "#c4c4c4" }, { pointIndexes: [54, 57, 61, 58], colour: "#c4c4c4" }, { pointIndexes: [57, 56, 60, 61], colour: "#c4c4c4" }, { pointIndexes: [50, 53, 57, 54], colour: "#c4c4c4" }, { pointIndexes: [53, 52, 56, 57], colour: "#c4c4c4" }, { pointIndexes: [52, 51, 55, 56], colour: "#c4c4c4" }, { pointIndexes: [51, 50, 54, 55], colour: "#c4c4c4" }, { pointIndexes: [51, 50, 53, 52], colour: "#c4c4c4" }];
    }
}
class RookObject extends Shape {
    constructor() {
        super();
        this.pointMatrix = new matrix();
        const points = [[-30, 0, 30], [30, 0, 30], [30, 0, -30], [-30, 0, -30], [-30, 10, 30], [30, 10, 30], [30, 10, -30], [-30, 10, -30], [-25, 20, 25], [25, 20, 25], [25, 20, -25], [-25, 20, -25], [-10, 35, 10], [10, 35, 10], [10, 35, -10], [-10, 35, -10], [-10, 100, 10], [10, 100, 10], [10, 100, -10], [-10, 100, -10], [-25, 110, 25], [25, 110, 25], [25, 110, -25], [-25, 110, -25], [-25, 130, 25], [25, 130, 25], [25, 130, -25], [-25, 130, -25], [-10, 120, 10], [10, 120, 10], [10, 120, -10], [-10, 120, -10]];
        for (let i = 0; i != points.length; i += 1) {
            this.pointMatrix.addColumn(points[i]);
        }
        const [centeringX, centeringY, centeringZ] = [0, 0, 0];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);
        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{ pointIndexes: [1, 0, 4, 5], colour: "#c4c4c4" }, { pointIndexes: [0, 3, 7, 4], colour: "#c4c4c4" }, { pointIndexes: [3, 2, 6, 7], colour: "#c4c4c4" }, { pointIndexes: [2, 1, 5, 6], colour: "#c4c4c4" }, { pointIndexes: [6, 10, 9, 5], colour: "#c4c4c4" }, { pointIndexes: [5, 9, 8, 4], colour: "#c4c4c4" }, { pointIndexes: [4, 8, 11, 7], colour: "#c4c4c4" }, { pointIndexes: [10, 11, 7, 6], colour: "#c4c4c4" }, { pointIndexes: [11, 15, 14, 10], colour: "#c4c4c4" }, { pointIndexes: [10, 14, 13, 9], colour: "#c4c4c4" }, { pointIndexes: [9, 13, 12, 8], colour: "#c4c4c4" }, { pointIndexes: [8, 12, 15, 11], colour: "#c4c4c4" }, { pointIndexes: [12, 15, 19, 16], colour: "#c4c4c4" }, { pointIndexes: [15, 14, 18, 19], colour: "#c4c4c4" }, { pointIndexes: [14, 18, 17, 13], colour: "#c4c4c4" }, { pointIndexes: [13, 17, 16, 12], colour: "#c4c4c4" }, { pointIndexes: [18, 22, 21, 17], colour: "#c4c4c4" }, { pointIndexes: [21, 17, 16, 20], colour: "#c4c4c4" }, { pointIndexes: [20, 16, 19, 23], colour: "#c4c4c4" }, { pointIndexes: [23, 19, 18, 22], colour: "#c4c4c4" }, { pointIndexes: [27, 23, 22, 26], colour: "#c4c4c4" }, { pointIndexes: [26, 22, 21, 25], colour: "#c4c4c4" }, { pointIndexes: [25, 21, 20, 24], colour: "#c4c4c4" }, { pointIndexes: [24, 20, 23, 27], colour: "#c4c4c4" }, { pointIndexes: [24, 28, 31, 27], colour: "#c4c4c4" }, { pointIndexes: [27, 31, 30, 26], colour: "#c4c4c4" }, { pointIndexes: [26, 30, 29, 25], colour: "#c4c4c4" }, { pointIndexes: [25, 29, 28, 24], colour: "#c4c4c4" }, { pointIndexes: [30, 31, 28, 29], colour: "#c4c4c4" }];
    }
}
class KnightObject extends Shape {
    constructor() {
        super();
        this.pointMatrix = new matrix();
        const points = [[-30, 0, 30], [30, 0, 30], [30, 0, -30], [-30, 0, -30], [-30, 10, 30], [30, 10, 30], [30, 10, -30], [-30, 10, -30], [-25, 20, 25], [25, 20, 25], [25, 20, -25], [-25, 20, -25], [-10, 25, 20], [10, 25, 20], [10, 25, -20], [-10, 25, -20], [-10, 60, 20], [10, 60, 20], [10, 60, -20], [-10, 60, -20], [-10, 80, 5], [10, 80, 5], [10, 80, -20], [-10, 80, -20], [-15, 85, 35], [15, 85, 35], [15, 85, -25], [-15, 85, -25], [-12.5, 100, 5], [12.5, 100, 5], [12.5, 100, -25], [-12.5, 100, -25]];
        for (let i = 0; i != points.length; i += 1) {
            this.pointMatrix.addColumn(points[i]);
        }
        const [centeringX, centeringY, centeringZ] = [0, 0, 0];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);
        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{ pointIndexes: [1, 0, 4, 5], colour: "#c4c4c4" }, { pointIndexes: [0, 3, 7, 4], colour: "#c4c4c4" }, { pointIndexes: [3, 2, 6, 7], colour: "#c4c4c4" }, { pointIndexes: [2, 1, 5, 6], colour: "#c4c4c4" }, { pointIndexes: [6, 10, 9, 5], colour: "#c4c4c4" }, { pointIndexes: [5, 9, 8, 4], colour: "#c4c4c4" }, { pointIndexes: [4, 8, 11, 7], colour: "#c4c4c4" }, { pointIndexes: [10, 11, 7, 6], colour: "#c4c4c4" }, { pointIndexes: [11, 15, 14, 10], colour: "#c4c4c4" }, { pointIndexes: [10, 14, 13, 9], colour: "#c4c4c4" }, { pointIndexes: [9, 13, 12, 8], colour: "#c4c4c4" }, { pointIndexes: [8, 12, 15, 11], colour: "#c4c4c4" }, { pointIndexes: [16, 12, 15, 19], colour: "#c4c4c4" }, { pointIndexes: [19, 15, 14, 18], colour: "#c4c4c4" }, { pointIndexes: [18, 14, 13, 17], colour: "#c4c4c4" }, { pointIndexes: [17, 13, 12, 16], colour: "#c4c4c4" }, { pointIndexes: [21, 17, 16, 20], colour: "#c4c4c4" }, { pointIndexes: [16, 20, 23, 19], colour: "#c4c4c4" }, { pointIndexes: [23, 22, 18, 19], colour: "#c4c4c4" }, { pointIndexes: [22, 18, 17, 21], colour: "#c4c4c4" }, { pointIndexes: [22, 21, 25, 26], colour: "#c4c4c4" }, { pointIndexes: [21, 20, 24, 25], colour: "#c4c4c4" }, { pointIndexes: [24, 20, 23, 27], colour: "#c4c4c4" }, { pointIndexes: [27, 26, 22, 23], colour: "#c4c4c4" }, { pointIndexes: [31, 27, 26, 30], colour: "#c4c4c4" }, { pointIndexes: [30, 26, 25, 29], colour: "#c4c4c4" }, { pointIndexes: [29, 28, 24, 25], colour: "#c4c4c4" }, { pointIndexes: [24, 27, 31, 28], colour: "#c4c4c4" }, { pointIndexes: [28, 29, 30, 31], colour: "#c4c4c4" }];
    }
}
class BishopObject extends Shape {
    constructor() {
        super();
        this.pointMatrix = new matrix();
        const points = [[-30, 0, 30], [30, 0, 30], [30, 0, -30], [-30, 0, -30], [-30, 10, 30], [30, 10, 30], [30, 10, -30], [-30, 10, -30], [-25, 20, 25], [25, 20, 25], [25, 20, -25], [-25, 20, -25], [-10, 35, 10], [10, 35, 10], [10, 35, -10], [-10, 35, -10], [-10, 80, 10], [10, 80, 10], [10, 80, -10], [-10, 80, -10], [-20, 85, 20], [20, 85, 20], [20, 85, -20], [-20, 85, -20], [-10, 95, 10], [10, 95, 10], [10, 95, -10], [-10, 95, -10], [-20, 110, 10], [20, 110, 10], [20, 110, -10], [-20, 110, -10], [-10, 110, -20], [10, 110, -20], [-10, 110, 20], [10, 110, 20], [0, 130, 0]];
        for (let i = 0; i != points.length; i += 1) {
            this.pointMatrix.addColumn(points[i]);
        }
        const [centeringX, centeringY, centeringZ] = [0, 0, 0];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);
        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{ pointIndexes: [1, 0, 4, 5], colour: "#c4c4c4" }, { pointIndexes: [0, 3, 7, 4], colour: "#c4c4c4" }, { pointIndexes: [3, 2, 6, 7], colour: "#c4c4c4" }, { pointIndexes: [2, 1, 5, 6], colour: "#c4c4c4" }, { pointIndexes: [6, 10, 9, 5], colour: "#c4c4c4" }, { pointIndexes: [5, 9, 8, 4], colour: "#c4c4c4" }, { pointIndexes: [4, 8, 11, 7], colour: "#c4c4c4" }, { pointIndexes: [10, 11, 7, 6], colour: "#c4c4c4" }, { pointIndexes: [11, 15, 14, 10], colour: "#c4c4c4" }, { pointIndexes: [10, 14, 13, 9], colour: "#c4c4c4" }, { pointIndexes: [9, 13, 12, 8], colour: "#c4c4c4" }, { pointIndexes: [8, 12, 15, 11], colour: "#c4c4c4" }, { pointIndexes: [12, 15, 19, 16], colour: "#c4c4c4" }, { pointIndexes: [15, 14, 18, 19], colour: "#c4c4c4" }, { pointIndexes: [14, 18, 17, 13], colour: "#c4c4c4" }, { pointIndexes: [13, 17, 16, 12], colour: "#c4c4c4" }, { pointIndexes: [20, 16, 19, 23], colour: "#c4c4c4" }, { pointIndexes: [23, 19, 18, 22], colour: "#c4c4c4" }, { pointIndexes: [22, 18, 17, 21], colour: "#c4c4c4" }, { pointIndexes: [21, 17, 16, 20], colour: "#c4c4c4" }, { pointIndexes: [25, 24, 20, 21], colour: "#c4c4c4" }, { pointIndexes: [24, 27, 23, 20], colour: "#c4c4c4" }, { pointIndexes: [23, 27, 26, 22], colour: "#c4c4c4" }, { pointIndexes: [22, 26, 25, 21], colour: "#c4c4c4" }, { pointIndexes: [30, 29, 25, 26], colour: "#c4c4c4" }, { pointIndexes: [29, 35, 25], colour: "#c4c4c4" }, { pointIndexes: [35, 34, 24, 25], colour: "#c4c4c4" }, { pointIndexes: [34, 28, 24], colour: "#c4c4c4" }, { pointIndexes: [28, 31, 27, 24], colour: "#c4c4c4" }, { pointIndexes: [31, 32, 27], colour: "#c4c4c4" }, { pointIndexes: [32, 33, 26, 27], colour: "#c4c4c4" }, { pointIndexes: [33, 30, 26], colour: "#c4c4c4" }, { pointIndexes: [36, 30, 29], colour: "#c4c4c4" }, { pointIndexes: [36, 29, 35], colour: "#c4c4c4" }, { pointIndexes: [36, 35, 34], colour: "#c4c4c4" }, { pointIndexes: [36, 34, 28], colour: "#c4c4c4" }, { pointIndexes: [36, 28, 31], colour: "#c4c4c4" }, { pointIndexes: [36, 31, 32], colour: "#c4c4c4" }, { pointIndexes: [36, 32, 33], colour: "#c4c4c4" }, { pointIndexes: [36, 33, 30], colour: "#c4c4c4" }];
    }
}
class QueenObject extends Shape {
    constructor() {
        super();
        this.pointMatrix = new matrix();
        const points = [[-30, 0, 30], [30, 0, 30], [30, 0, -30], [-30, 0, -30], [-30, 10, 30], [30, 10, 30], [30, 10, -30], [-30, 10, -30], [-25, 20, 25], [25, 20, 25], [25, 20, -25], [-25, 20, -25], [-10, 35, 10], [10, 35, 10], [10, 35, -10], [-10, 35, -10], [-10, 80, 10], [10, 80, 10], [10, 80, -10], [-10, 80, -10], [-20, 85, 20], [20, 85, 20], [20, 85, -20], [-20, 85, -20], [-10, 95, 10], [10, 95, 10], [10, 95, -10], [-10, 95, -10], [-24, 130, 12], [24, 130, 12], [24, 130, -12], [-24, 130, -12], [-12, 130, -24], [12, 130, -24], [-12, 130, 24], [12, 130, 24], [-10, 125, 10], [10, 125, 10], [10, 125, -10], [-10, 125, -10], [-2, 127.5, 2], [2, 127.5, 2], [2, 127.5, -2], [-2, 127.5, -2], [-2, 130, 2], [2, 130, 2], [2, 130, -2], [-2, 130, -2]];
        for (let i = 0; i != points.length; i += 1) {
            this.pointMatrix.addColumn(points[i]);
        }
        const [centeringX, centeringY, centeringZ] = [0, 0, 0];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);
        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{ pointIndexes: [1, 0, 4, 5], colour: "#c4c4c4" }, { pointIndexes: [0, 3, 7, 4], colour: "#c4c4c4" }, { pointIndexes: [3, 2, 6, 7], colour: "#c4c4c4" }, { pointIndexes: [2, 1, 5, 6], colour: "#c4c4c4" }, { pointIndexes: [6, 10, 9, 5], colour: "#c4c4c4" }, { pointIndexes: [5, 9, 8, 4], colour: "#c4c4c4" }, { pointIndexes: [4, 8, 11, 7], colour: "#c4c4c4" }, { pointIndexes: [10, 11, 7, 6], colour: "#c4c4c4" }, { pointIndexes: [11, 15, 14, 10], colour: "#c4c4c4" }, { pointIndexes: [10, 14, 13, 9], colour: "#c4c4c4" }, { pointIndexes: [9, 13, 12, 8], colour: "#c4c4c4" }, { pointIndexes: [8, 12, 15, 11], colour: "#c4c4c4" }, { pointIndexes: [12, 15, 19, 16], colour: "#c4c4c4" }, { pointIndexes: [15, 14, 18, 19], colour: "#c4c4c4" }, { pointIndexes: [14, 18, 17, 13], colour: "#c4c4c4" }, { pointIndexes: [13, 17, 16, 12], colour: "#c4c4c4" }, { pointIndexes: [20, 16, 19, 23], colour: "#c4c4c4" }, { pointIndexes: [23, 19, 18, 22], colour: "#c4c4c4" }, { pointIndexes: [22, 18, 17, 21], colour: "#c4c4c4" }, { pointIndexes: [21, 17, 16, 20], colour: "#c4c4c4" }, { pointIndexes: [25, 24, 20, 21], colour: "#c4c4c4" }, { pointIndexes: [24, 27, 23, 20], colour: "#c4c4c4" }, { pointIndexes: [23, 27, 26, 22], colour: "#c4c4c4" }, { pointIndexes: [22, 26, 25, 21], colour: "#c4c4c4" }, { pointIndexes: [30, 29, 25, 26], colour: "#c4c4c4" }, { pointIndexes: [29, 35, 25], colour: "#c4c4c4" }, { pointIndexes: [35, 34, 24, 25], colour: "#c4c4c4" }, { pointIndexes: [34, 28, 24], colour: "#c4c4c4" }, { pointIndexes: [28, 31, 27, 24], colour: "#c4c4c4" }, { pointIndexes: [31, 32, 27], colour: "#c4c4c4" }, { pointIndexes: [32, 33, 26, 27], colour: "#c4c4c4" }, { pointIndexes: [33, 30, 26], colour: "#c4c4c4" }, { pointIndexes: [35, 37, 29], colour: "#c4c4c4" }, { pointIndexes: [35, 37, 36, 34], colour: "#c4c4c4" }, { pointIndexes: [34, 36, 28], colour: "#c4c4c4" }, { pointIndexes: [28, 36, 39, 31], colour: "#c4c4c4" }, { pointIndexes: [31, 39, 32], colour: "#c4c4c4" }, { pointIndexes: [32, 39, 38, 33], colour: "#c4c4c4" }, { pointIndexes: [33, 38, 30], colour: "#c4c4c4" }, { pointIndexes: [30, 38, 37, 29], colour: "#c4c4c4" }, { pointIndexes: [39, 43, 42, 38], colour: "#c4c4c4" }, { pointIndexes: [38, 42, 41, 37], colour: "#c4c4c4" }, { pointIndexes: [37, 41, 40, 36], colour: "#c4c4c4" }, { pointIndexes: [36, 40, 43, 39], colour: "#c4c4c4" }, { pointIndexes: [41, 45, 44, 40], colour: "#c4c4c4" }, { pointIndexes: [40, 44, 47, 43], colour: "#c4c4c4" }, { pointIndexes: [43, 47, 46, 42], colour: "#c4c4c4" }, { pointIndexes: [42, 46, 45, 41], colour: "#c4c4c4" }, { pointIndexes: [44, 45, 46, 47], colour: "#c4c4c4" }];
    }
}
//Piece Classes
const whitePieceColour = "#ffffff";
const blackPieceColour = "#525252";
class Piece {
    constructor() {
        this.type = "pawn";
        this.colour = "white";
        this.body = new Shape(); //a reference to an object which will get rendered
    }
    setupObject(scale) {
        this.body.showOutline = true;
        this.body.scale = scale;
        this.body.updateMatrices();
        if (this.colour == "white") {
            setColour(this.body, whitePieceColour);
        }
        else if (this.colour == "black") {
            setColour(this.body, blackPieceColour);
        }
    }
}
class Pawn extends Piece {
    constructor(colour) {
        super();
        this.type = "pawn";
        this.body = new PawnObject();
        this.colour = colour;
        this.setupObject(0.7);
    }
}
class Rook extends Piece {
    constructor(colour) {
        super();
        this.type = "rook";
        this.body = new RookObject();
        this.colour = colour;
        this.setupObject(0.85);
    }
}
class Knight extends Piece {
    constructor(colour) {
        super();
        this.type = "knight";
        this.body = new KnightObject();
        this.colour = colour;
        this.setupObject(1);
        if (colour == "black") {
            this.body.rotation.y = 180;
            this.body.updateMatrices();
        }
    }
}
class Bishop extends Piece {
    constructor(colour) {
        super();
        this.type = "bishop";
        this.body = new BishopObject();
        this.colour = colour;
        this.setupObject(0.95);
    }
}
class Queen extends Piece {
    constructor(colour) {
        super();
        this.type = "queen";
        this.body = new QueenObject();
        this.colour = colour;
        this.setupObject(1.1);
    }
}
class King extends Piece {
    constructor(colour) {
        super();
        this.type = "king";
        this.body = new SampleObject();
        this.colour = colour;
        this.setupObject(1);
    }
}
//BOARD
class ChessBoardTop extends Shape {
    constructor() {
        super();
        this.pointMatrix = new matrix();
        const points = [[0, 0, 0], [100, 0, 0], [100, 0, 100], [0, 0, 100], [0, 0, 200], [100, 0, 200], [100, 0, 300], [0, 0, 300], [0, 0, 400], [100, 0, 400], [100, 0, 500], [0, 0, 500], [0, 0, 600], [100, 0, 600], [100, 0, 700], [0, 0, 700], [0, 0, 800], [100, 0, 800], [200, 0, 0], [300, 0, 0], [300, 0, 100], [200, 0, 100], [200, 0, 200], [300, 0, 200], [300, 0, 300], [200, 0, 300], [200, 0, 400], [300, 0, 400], [300, 0, 500], [200, 0, 500], [200, 0, 600], [300, 0, 600], [300, 0, 700], [200, 0, 700], [200, 0, 800], [300, 0, 800], [400, 0, 0], [500, 0, 0], [500, 0, 100], [400, 0, 100], [400, 0, 200], [500, 0, 200], [500, 0, 300], [400, 0, 300], [400, 0, 400], [500, 0, 400], [500, 0, 500], [400, 0, 500], [400, 0, 600], [500, 0, 600], [500, 0, 700], [400, 0, 700], [400, 0, 800], [500, 0, 800], [600, 0, 0], [700, 0, 0], [700, 0, 100], [600, 0, 100], [600, 0, 200], [700, 0, 200], [700, 0, 300], [600, 0, 300], [600, 0, 400], [700, 0, 400], [700, 0, 500], [600, 0, 500], [600, 0, 600], [700, 0, 600], [700, 0, 700], [600, 0, 700], [600, 0, 800], [700, 0, 800], [800, 0, 0], [800, 0, 100], [800, 0, 200], [800, 0, 300], [800, 0, 400], [800, 0, 500], [800, 0, 600], [800, 0, 700], [800, 0, 800]];
        for (let i = 0; i != points.length; i += 1) {
            this.pointMatrix.addColumn(points[i]);
        }
        const [centeringX, centeringY, centeringZ] = [-400, 0, -400];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);
        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{ pointIndexes: [0, 1, 2, 3], colour: "#c4c4c4" }, { pointIndexes: [1, 18, 21, 2], colour: "#c4c4c4" }, { pointIndexes: [18, 19, 20, 21], colour: "#c4c4c4" }, { pointIndexes: [19, 36, 39, 20], colour: "#c4c4c4" }, { pointIndexes: [36, 37, 38, 39], colour: "#c4c4c4" }, { pointIndexes: [37, 54, 57, 38], colour: "#c4c4c4" }, { pointIndexes: [54, 55, 56, 57], colour: "#c4c4c4" }, { pointIndexes: [55, 72, 73, 56], colour: "#c4c4c4" }, { pointIndexes: [3, 2, 5, 4], colour: "#c4c4c4" }, { pointIndexes: [2, 21, 22, 5], colour: "#c4c4c4" }, { pointIndexes: [21, 20, 23, 22], colour: "#c4c4c4" }, { pointIndexes: [20, 39, 40, 23], colour: "#c4c4c4" }, { pointIndexes: [39, 38, 41, 40], colour: "#c4c4c4" }, { pointIndexes: [38, 57, 58, 41], colour: "#c4c4c4" }, { pointIndexes: [57, 56, 59, 58], colour: "#c4c4c4" }, { pointIndexes: [56, 73, 74, 59], colour: "#c4c4c4" }, { pointIndexes: [4, 5, 6, 7], colour: "#c4c4c4" }, { pointIndexes: [5, 22, 25, 6], colour: "#c4c4c4" }, { pointIndexes: [22, 23, 24, 25], colour: "#c4c4c4" }, { pointIndexes: [23, 40, 43, 24], colour: "#c4c4c4" }, { pointIndexes: [40, 41, 42, 43], colour: "#c4c4c4" }, { pointIndexes: [41, 58, 61, 42], colour: "#c4c4c4" }, { pointIndexes: [58, 59, 60, 61], colour: "#c4c4c4" }, { pointIndexes: [59, 74, 75, 60], colour: "#c4c4c4" }, { pointIndexes: [7, 6, 9, 8], colour: "#c4c4c4" }, { pointIndexes: [6, 25, 26, 9], colour: "#c4c4c4" }, { pointIndexes: [25, 24, 27, 26], colour: "#c4c4c4" }, { pointIndexes: [24, 43, 44, 27], colour: "#c4c4c4" }, { pointIndexes: [43, 42, 45, 44], colour: "#c4c4c4" }, { pointIndexes: [42, 61, 62, 45], colour: "#c4c4c4" }, { pointIndexes: [61, 60, 63, 62], colour: "#c4c4c4" }, { pointIndexes: [60, 75, 76, 63], colour: "#c4c4c4" }, { pointIndexes: [8, 9, 10, 11], colour: "#c4c4c4" }, { pointIndexes: [9, 26, 29, 10], colour: "#c4c4c4" }, { pointIndexes: [26, 27, 28, 29], colour: "#c4c4c4" }, { pointIndexes: [27, 44, 47, 28], colour: "#c4c4c4" }, { pointIndexes: [44, 45, 46, 47], colour: "#c4c4c4" }, { pointIndexes: [45, 62, 65, 46], colour: "#c4c4c4" }, { pointIndexes: [62, 63, 64, 65], colour: "#c4c4c4" }, { pointIndexes: [63, 76, 77, 64], colour: "#c4c4c4" }, { pointIndexes: [11, 10, 13, 12], colour: "#c4c4c4" }, { pointIndexes: [10, 29, 30, 13], colour: "#c4c4c4" }, { pointIndexes: [29, 28, 31, 30], colour: "#c4c4c4" }, { pointIndexes: [28, 47, 48, 31], colour: "#c4c4c4" }, { pointIndexes: [47, 46, 49, 48], colour: "#c4c4c4" }, { pointIndexes: [46, 65, 66, 49], colour: "#c4c4c4" }, { pointIndexes: [65, 64, 67, 66], colour: "#c4c4c4" }, { pointIndexes: [64, 77, 78, 67], colour: "#c4c4c4" }, { pointIndexes: [12, 13, 14, 15], colour: "#c4c4c4" }, { pointIndexes: [13, 30, 33, 14], colour: "#c4c4c4" }, { pointIndexes: [30, 31, 32, 33], colour: "#c4c4c4" }, { pointIndexes: [31, 48, 51, 32], colour: "#c4c4c4" }, { pointIndexes: [48, 49, 50, 51], colour: "#c4c4c4" }, { pointIndexes: [49, 66, 69, 50], colour: "#c4c4c4" }, { pointIndexes: [66, 67, 68, 69], colour: "#c4c4c4" }, { pointIndexes: [67, 78, 79, 68], colour: "#c4c4c4" }, { pointIndexes: [15, 14, 17, 16], colour: "#c4c4c4" }, { pointIndexes: [14, 33, 34, 17], colour: "#c4c4c4" }, { pointIndexes: [33, 32, 35, 34], colour: "#c4c4c4" }, { pointIndexes: [32, 51, 52, 35], colour: "#c4c4c4" }, { pointIndexes: [51, 50, 53, 52], colour: "#c4c4c4" }, { pointIndexes: [50, 69, 70, 53], colour: "#c4c4c4" }, { pointIndexes: [69, 68, 71, 70], colour: "#c4c4c4" }, { pointIndexes: [68, 79, 80, 71], colour: "#c4c4c4" }];
    }
}
const board = {};
let boardPieces = [];
const updateBoardPieces = () => {
    boardPieces = [];
    for (let key in board) {
        const currentPiece = board[key];
        const gridPosition = gridCoordinates(key);
        currentPiece.body.position = { x: gridPosition[0], y: gridPosition[1], z: gridPosition[2] };
        boardPieces.push(currentPiece.body);
    }
};
const movePiece = (fromSquare, toSquare) => {
    const piece = board[fromSquare];
    delete board[fromSquare];
    board[toSquare] = piece;
    updateBoardPieces();
};

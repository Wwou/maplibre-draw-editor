declare const DrawMode: {
    readonly NONE: "none";
    readonly POINT: "point";
    readonly LINE: "line";
    readonly POLYGON: "polygon";
    readonly CIRCLE: "circle";
    readonly SELECT: "select";
};
type DrawMode = typeof DrawMode[keyof typeof DrawMode];
/**
 * 绘制工具初始化选项接口
 */
interface DrawOptions {
    map: any;
    sourceId?: string;
    pointLayerId?: string;
    lineLayerId?: string;
    lineDashedLayerId?: string;
    polygonLayerId?: string;
    circleLayerId?: string;
    primaryColor?: string;
    enableDeleteConfirmation?: boolean;
    onFeatureSelect?: (feature: any) => void;
    onDragStart?: (feature: any) => void;
    onFeatureChange?: (feature: any) => void;
    onDragEnd?: (feature: any) => void;
    onVertexAdd?: (feature: any) => void;
    onVertexRemove?: (feature: any) => void;
    onDrawEnd?: (feature: any) => void;
    onModeChange?: (mode: DrawMode) => void;
}
/**
 * 样式选项接口
 */
interface StyleOptions {
    primaryColor?: string;
    lineWidth?: number;
    lineOpacity?: number;
    fillOpacity?: number;
    circleRadius?: number;
    dashed?: boolean;
}
/**
 * MapLibreDraw 类 - 基于 MapLibre GL JS 实现的绘制和编辑工具
 * 支持绘制点、线、面、圆等几何要素，并提供编辑功能
 */
declare class MapLibreDraw {
    private map;
    private sourceId;
    private pointLayerId;
    private lineLayerId;
    private lineDashedLayerId;
    private polygonLayerId;
    private circleLayerId;
    private currentMode;
    private features;
    private currentFeature;
    private currentCoordinates;
    private isDrawing;
    private selectedFeatureId;
    private selectedVertexIndex;
    private isDragging;
    private dragStart;
    private dragStartPoint;
    private midpointInfo;
    private primaryColor;
    private enableDeleteConfirmation;
    private onFeatureSelect?;
    private onDragStart?;
    private onFeatureChange?;
    private onDragEnd?;
    private onVertexAdd?;
    private onVertexRemove?;
    private onDrawEnd?;
    private onModeChange?;
    private vertexSourceId;
    private vertexLayerId;
    private midpointSourceId;
    private midpointLayerId;
    /**
     * 构造函数
     * @param options 初始化选项
     */
    constructor(options: DrawOptions);
    /**
     * 初始化方法，添加数据源和图层
     */
    private init;
    /**
     * 添加地图图层
     */
    private addLayers;
    /**
     * 设置事件监听器
     */
    private setupEventListeners;
    /**
     * 添加点要素
     * @param lngLat 经纬度坐标
     */
    private addPoint;
    /**
     * 添加坐标点到当前绘制的要素
     * @param lngLat 经纬度坐标
     */
    private addCoordinate;
    /**
     * 创建当前绘制的要素
     */
    private createCurrentFeature;
    /**
     * 更新绘制预览
     * @param lngLat 鼠标当前经纬度坐标
     */
    private updatePreview;
    /**
     * 完成绘制
     */
    private finishDrawing;
    /**
     * 重置绘制状态
     */
    private resetDrawing;
    /**
     * 更新数据源
     */
    private updateSource;
    /**
     * 获取当前绘制模式
     * @returns 当前绘制模式
     */
    getMode(): DrawMode;
    /**
     * 获取所有绘制的要素
     * @returns 要素数组
     */
    getFeatures(): GeoJSON.Feature[];
    /**
     * 清除所有绘制的要素
     */
    clear(): void;
    /**
     * 删除指定的要素
     * @param featureId 要素ID
     * @returns 是否成功删除
     */
    removeFeatureById(featureId: string): boolean;
    /**
     * 选中指定的要素,进入编辑、拖拽状态
     * @param featureId 要素ID
     * @returns 是否成功选中
     */
    selectFeatureById(featureId: string): boolean;
    /**
     * 向要素集合中添加新的要素
     * @param feature 要添加的要素
     * @param style 样式选项（可选）
     * @returns 添加的要素（包含生成的ID）
     */
    addFeature(feature: GeoJSON.Feature, style?: StyleOptions): GeoJSON.Feature;
    /**
     * 创建删除确认按钮
     * @param point 鼠标点击位置
     * @param featureId 要删除的要素ID
     */
    private createDeleteConfirmationButton;
    /**
     * 移除删除确认按钮
     */
    private removeDeleteConfirmationButton;
    /**
     * 选择要素
     * @param e 点击事件对象
     */
    private selectFeature;
    /**
     * 开始拖拽操作
     * @param e 鼠标按下事件对象，包含鼠标位置和事件信息
     * 功能：处理鼠标按下时的拖拽开始逻辑，包括顶点拖拽、中点拖拽和要素整体拖拽
     * 处理流程：
     * 1. 检查是否点击了顶点，如果是则开始顶点拖拽
     * 2. 检查是否点击了中点，如果是则记录中点信息，准备插入新顶点
     * 3. 检查是否点击了要素主体，如果是则开始整个要素的拖拽
     * 4. 阻止地图默认拖动行为，确保拖拽操作流畅
     */
    private startDrag;
    /**
     * 处理拖拽操作
     * @param e 鼠标移动事件对象，包含鼠标位置和事件信息
     * 功能：处理鼠标移动时的拖拽逻辑，包括顶点拖拽、中点拖拽和要素整体拖拽
     * 处理流程：
     * 1. 检查是否是从中点开始的拖拽，如果是则插入新顶点
     * 2. 计算鼠标移动的屏幕偏移量
     * 3. 根据拖拽类型（顶点拖拽或要素整体拖拽）更新要素坐标
     * 4. 处理不同类型要素的拖拽逻辑（点、线、面、圆）
     * 5. 更新数据源和顶点显示
     * 6. 调用要素变化回调
     * 7. 更新拖拽起始点，为下一次拖拽做准备
     */
    private handleDrag;
    /**
     * 删除顶点
     * @param e 双击事件对象
     */
    private deleteVertex;
    /**
     * 删除选中的要素
     */
    private deleteFeature;
    /**
     * 取消选择要素
     */
    private deselectFeature;
    /**
     * 更新顶点和中点显示
     * 功能：根据选中的要素类型和坐标，计算并更新顶点和中点的显示
     * 处理流程：
     * 1. 清空顶点和中点数组
     * 2. 根据选中的要素类型（点、线、面、圆）生成对应的顶点
     * 3. 对于线和面要素，计算并生成中点
     * 4. 更新顶点和中点数据源
     */
    private updateVertices;
    /**
     * 计算视觉中点
     * @param coord1 第一个坐标点
     * @param coord2 第二个坐标点
     * @returns 视觉中点坐标
     */
    private calculateVisualMidpoint;
    /**
     * 插入顶点
     * @param index 插入位置
     * @param lngLat 新顶点坐标
     */
    private insertVertex;
    private currentStyle;
    /**
     * 设置绘制模式
     * @param mode 绘制模式
     * @param style 样式选项（可选）
     */
    setMode(mode: DrawMode, style?: StyleOptions): void;
}
export default MapLibreDraw;
export { DrawMode, };
export type { DrawOptions, StyleOptions };

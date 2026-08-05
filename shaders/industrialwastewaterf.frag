#define HIGHP

// 替换后的颜色
#define S1 vec3(129.0, 123.0, 108.0) / 255.0   // 817B6C
#define S2 vec3(115.0, 105.0, 93.0) / 255.0    // 73695D

#define NSCALE 100.0 / 2.0

uniform sampler2D u_texture;
uniform sampler2D u_noise;

uniform vec2 u_campos;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_texCoords;

void main() {
    vec2 c = v_texCoords.xy;
    vec2 coords = vec2(c.x * u_resolution.x + u_campos.x, c.y * u_resolution.y + u_campos.y);
    
    // 原有噪声计算（保持不变）
    float btime = u_time / 5400.0;
    float wave = abs(sin(coords.x * 1.1 + coords.y) + 0.1 * sin(2.5 * coords.x) + 0.15 * sin(3.0 * coords.y)) / 30.0;
    float noise = wave + (texture2D(u_noise, (coords) / NSCALE + vec2(btime) * vec2(-0.2, 0.9)).r + texture2D(u_noise, (coords) / NSCALE + vec2(btime * 1.1) * vec2(0.9, -1.0)).r) / 2.0;
    
    // 图像扭曲部分（水平偏移采样）
    vec2 v = vec2(1.0 / u_resolution.x, 1.0 / u_resolution.y);   // 单个像素的纹理坐标步长
    float stime = u_time / 5.0;                                 // 扭曲动画速度
    float offsetX = sin(stime / 3.0 + coords.y / 0.75) * v.x;   // 水平偏移量，最大 ±1 像素
    vec4 color = texture2D(u_texture, c + vec2(offsetX, 0.0));   // 带偏移的采样
    
    // 原有的颜色替换逻辑（基于噪声）
    if (noise > 0.54 && noise < 0.57) {
        color.rgb = S2;   // 深色
    } else if (noise > 0.49 && noise < 0.62) {
        color.rgb = S1;   // 浅色
    }
    
    gl_FragColor = color;
}
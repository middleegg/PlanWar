#define HIGHP

uniform sampler2D u_texture;
uniform sampler2D u_noise;
uniform sampler2D u_flying;

uniform vec2 u_campos;
uniform float u_time;

varying vec2 v_texCoords;

uniform vec2 mscl;
uniform float tscal;
const float mth = 7.0;

const vec3 sky = vec3(0.5, 0.8, 1.0);

float ridge(float x){
    return min(max(0.5 - (2.0 * x), 2.0 * x - 0.5), 2.5 - (2.0 * x)) - 0.5;
}

void main(){
    float btime = tscal * u_time / 1500.0;
    vec2 c = v_texCoords;

    // 像素步长
    vec2 v = vec2(dFdx(c.x), dFdy(c.y));
    if (v.x < 0.000001) v.x = 0.001;
    if (v.y < 0.000001) v.y = 0.001;

    vec2 coords = c * 800.0 + u_campos; 
    
    // 冰面基础纹理
    vec4 fcolor = texture2D(u_texture, c);
    vec3 baseColor = fcolor.rgb * 0.8; 

    // 高度遮罩
    float hm_raw = texture2D(u_texture, c + vec2(0.0, 1.0) * v).a * 2.0;
    float hm = 0.4 + 0.6 * min(1.0, hm_raw);

    // 固定法线
    vec3 normal = vec3(0.0, 0.0, -1.0);
    vec3 cam = normalize(vec3((c.x - 0.5) * 1.0, c.y - 0.5, 1.0));
    vec3 light = normalize(vec3(0.0, -0.5, 6.0)); 
    vec3 refl = reflect(cam, normal);

    // 高光置零（去除亮点）
    float spec = 0.0;

    // 菲涅尔（幂次保持适中，权重降低）
    float fresnel = pow(1.0 - abs(dot(cam, normal)), 0.4); // 幂次不变

    // 【修改1】倒影向下移动更多：偏移量从0.06增大到0.10
    vec2 reflectUV = c + refl.xy * 0.1 + vec2(0.0, 0.20);

    vec3 refColor = mix(sky, texture2D(u_texture, reflectUV).rgb, 0.3);
    vec3 noiseRef = texture2D(u_noise, coords / mscl * 1.5 + refl.xy * 0.3).rrr;
    refColor = mix(refColor, noiseRef, 0.2);

    // 闪光点
    float sparkle1 = abs(ridge(texture2D(u_noise, coords / mscl * 2.0 + vec2(btime * 1.3)).r));
    float sparkle2 = abs(ridge(texture2D(u_noise, coords / mscl * 3.0 + vec2(-btime * 1.7, btime * 1.1)).r));
    float sparkle = pow(max(sparkle1, sparkle2), 10.0);

    // 【修改2】菲涅尔权重从1.0降至0.5，减弱边缘反光强度
    vec3 reflectLayer = (fresnel * 0.75) * refColor * hm;
    reflectLayer += vec3(1.0, 0.95, 0.9) * sparkle * 0.8 * hm;
    reflectLayer = min(reflectLayer, vec3(0.8));

    // 飞虫层
    vec4 fly = texture2D(u_flying, c + refl.xy * v * 30.0);
    float flyAlpha = fly.a * 0.2;
    vec3 mixedBase = mix(baseColor, fly.rgb, flyAlpha);

    // 最终合成
    vec3 finalColor = mixedBase + reflectLayer;
    finalColor = min(finalColor, vec3(1.0));

    float alpha = min(1.0, fcolor.a * 2.0);
    gl_FragColor = vec4(finalColor, alpha);
}
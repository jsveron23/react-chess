use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "/chess.js")]
extern "C" {
    #[wasm_bindgen(js_name = parseCode)]
    fn parse_code(code: String) -> js_sys::Object;

    #[wasm_bindgen(js_name = detectPiece)]
    fn detect_piece(piece: String, code: String) -> js_sys::Boolean;

    #[wasm_bindgen(js_name = replaceCode)]
    fn replace_code(snapshot: js_sys::Array, curr_code: String, next_code: String)
        -> js_sys::Array;

    #[wasm_bindgen(js_name = computeDistance)]
    fn compute_distance(code_a: String, code_b: String) -> js_sys::Object;

    #[wasm_bindgen(js_name = getDirection)]
    fn get_direction(file: u32, rank: u32) -> String;

    #[wasm_bindgen(js_name = findCodeByTile)]
    fn find_code_by_tile(snapshot: js_sys::Array, tile: String) -> String;

    #[wasm_bindgen(js_name = getAttackers)]
    fn get_attackers(defender_code: String, timeline: js_sys::Array) -> js_sys::Array;

    #[wasm_bindgen(js_name = computePossibleMT)]
    fn compute_possible_mt(
        attacker_code: Option<String>,
        attacker_routes: Option<js_sys::Array>,
        code: String,
        timeline: js_sys::Array,
    ) -> js_sys::Array;
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[wasm_bindgen]
pub fn run() {
    log(&format!(
        "detect_piece - {}!",
        detect_piece("P".into(), "wPa3".into())
    ));
    log(&format!("get_direction - {}!", get_direction(3, 3)));

    log_parsed_code();
}

#[wasm_bindgen]
pub fn log_parsed_code() {
    let parsed_code = parse_code("wPa3".into());

    let filename_key = JsValue::from("fileName");
    let rankname_key = JsValue::from("rankName");
    let pkey_key = JsValue::from("pKey");
    let code_key = JsValue::from("code");
    let side_key = JsValue::from("side");
    let piece_key = JsValue::from("piece");

    let filename = object_unwrap(&parsed_code, &filename_key).unwrap();
    let rankname = object_unwrap(&parsed_code, &rankname_key).unwrap();
    let pkey = object_unwrap(&parsed_code, &pkey_key).unwrap();
    let code = object_unwrap(&parsed_code, &code_key).unwrap();
    let side = object_unwrap(&parsed_code, &side_key).unwrap();
    let piece = object_unwrap(&parsed_code, &piece_key).unwrap();

    log(&format!("parse_code|filename - {:?}!", filename));
    log(&format!("parse_code|rankname - {:?}!", rankname));
    log(&format!("parse_code|pkey - {:?}!", pkey));
    log(&format!("parse_code|code - {:?}!", code));
    log(&format!("parse_code|side - {:?}!", side));
    log(&format!("parse_code|piece - {:?}!", piece));
}

#[wasm_bindgen]
pub fn object_unwrap(obj: &js_sys::Object, key: &JsValue) -> Result<JsValue, JsValue> {
    js_sys::Reflect::get(&obj, &key)
}

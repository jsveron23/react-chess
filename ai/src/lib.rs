use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn run() {
}

#[wasm_bindgen]
pub struct AI {

}

#[wasm_bindgen]
impl AI {
    #[wasm_bindgen(constructor)]
    pub fn new() -> AI {
        AI {}
    }
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

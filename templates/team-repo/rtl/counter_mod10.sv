// counter mod-10: dem 0..9 roi quay ve 0 (theo phong cach RTL cua giao trinh)
module counter_mod10 (
  input  logic       clk,
  input  logic       rst_n,   // reset bat dong bo, tich cuc muc thap
  input  logic       enable,
  output logic [3:0] count
);
  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)            count <= 4'd0;
    else if (enable)       count <= (count == 4'd9) ? 4'd0 : count + 4'd1;
  end
endmodule

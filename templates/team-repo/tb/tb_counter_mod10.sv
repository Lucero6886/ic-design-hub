module tb_counter_mod10;
  logic clk = 0, rst_n, enable;
  logic [3:0] count;
  counter_mod10 dut (.clk, .rst_n, .enable, .count);
  always #5 clk = ~clk;               // clock chu ky 10ns
  initial begin
    $dumpfile("wave.vcd");            // xuat file song cho GTKWave
    $dumpvars(0, tb_counter_mod10);
    rst_n = 0; enable = 0;
    #12 rst_n = 1; enable = 1;        // tha reset, cho phep dem
    #250;                             // du 2 lan wrap 9 -> 0
    if (count !== 4'd5) $error("du doan sai: count=%0d (ky vong 5)", count);
    $display("KET THUC: count=%0d sau 25 canh clock co enable — dung du doan", count);
    $finish;
  end
endmodule

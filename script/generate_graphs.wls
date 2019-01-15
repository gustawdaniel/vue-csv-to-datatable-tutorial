#!/usr/bin/env wolframscript
#
# usage
#
# wolframscript script/generate_graphs.wls
#

Print["Importing data..."];

Needs["GeneralUtilities`"]
res = Import["tests/measurements.json"];
dataset = Dataset[ToAssociations@res]["measurements"]

pairGen[f1_, f2_, v1_, v2_, f3_, f4_] := Module[{x, y, a, b, con},
   a = dataset[All, f1] // Normal;
   b = dataset[All, f2] // Normal;
   con[s_] :=
    DeleteMissing[
     MapIndexed[
      If[a[[First[#2]]] == v1 && b[[First[#2]]] == v2, #1,
        Missing[]] &, s]];
   x = con[dataset[All, f3] // Normal];
   y = con[dataset[All, f4] // Normal];
   Transpose[{x, y}]
];

Print["Generating Pairs..."];

ct = pairGen["row", "len", 10000, 10, "col", "time"];
rt = pairGen["len", "col", 10, 10, "row", "time"];
lt = pairGen["col", "row", 10, 10000, "len", "time"];
ctlm = LinearModelFit[ct, x, x];
rtlm = LinearModelFit[rt, x, x];
ltlm = LinearModelFit[lt, x, x];

Print["Plotting time(cols)..."];

cp=Show[ListPlot[ct,
  PlotLabel ->
   "Time for 10000 rows and 10 len in dependence from cloumns.",
  FrameLabel -> {"Columns", "Time [ms]"}, Joined -> False],
 Plot[ctlm[x], {x, 1, 30},
  PlotLabels -> Callout[ctlm // Normal, {Scaled[0.3], Above}]]]
Export["tests/ct.png", cp];

Print["Plotting time(rows)..."];

rp=Show[ListPlot[rt,
  PlotLabel ->
   "Time for 10 len and 10 colsumns in dependence from rows.",
  FrameLabel -> {"Rows", "Time [ms]"}, Joined -> False],
 Plot[rtlm[x], {x, 500, 40000},
  PlotLabels -> Callout[rtlm // Normal, {Scaled[0.3], Above}]]]
Export["tests/rt.png", rp];

Print["Plotting time(lengths)..."];

lp=Show[ListPlot[lt,
  PlotLabel ->
   "Time for 10000 rows and 10 len in dependence from cloumns.",
  FrameLabel -> {"Columns", "Time [ms]"}, Joined -> False,
  PlotRange -> All],
 Plot[Callout[ltlm[x], ltlm // Normal, {100, 400}], {x, 1, 200}]]
Export["tests/lt.png", lp];

Print["Files generated in tests directory."];

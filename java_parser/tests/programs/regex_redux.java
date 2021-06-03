/*The Computer Language
Benchmarks Game
regex-redux Java #3 program
description

source code*/
/*
   The Computer Language Benchmarks Game
   https://salsa.debian.org/benchmarksgame-team/benchmarksgame/

   contributed by Francois Green
*/

import java.io.*;
import java.util.*;

//import static java.util.stream.Collectors.*;

public class regexredux {

  public static void main(String[] args) throws IOException {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    {
        byte[] buf = new byte[65536];
        int count;
        while ((count = System.in.read(buf)) > 0) {
            baos.write(buf, 0, count);
        }
    }
    final String input = baos.toString("US-ASCII");

    final int initialLength = input.length();

    final String sequence = input.replaceAll(">.*\n|\n", "");

    CompletableFuture<String> replacements = CompletableFuture.supplyAsync(() -> {
        final Map<String, String> iub = new LinkedHashMap<>();
        iub.put("tHa[Nt]", "<4>");
        iub.put("aND|caN|Ha[DS]|WaS", "<3>");
        iub.put("a[NSt]|BY", "<2>");
        iub.put("<[^>]*>", "|");
        iub.put("\\|[^|][^|]*\\|", "-");

        String buffer = sequence;
/*        for (Map.Entry<String, String> entry : iub.entrySet()) {
            buffer = Pattern.compile(entry.getKey()).matcher(buffer).replaceAll(entry.getValue());
        }*/
        return buffer;
    });

    final int codeLength = sequence.length();

    final List<String> variants = Arrays.asList("agggtaaa|tttaccct",
                                                "[cgt]gggtaaa|tttaccc[acg]",
                                                "a[act]ggtaaa|tttacc[agt]t",
                                                "ag[act]gtaaa|tttac[agt]ct",
                                                "agg[act]taaa|ttta[agt]cct",
                                                "aggg[acg]aaa|ttt[cgt]ccct",
                                                "agggt[cgt]aa|tt[acg]accct",
                                                "agggta[cgt]a|t[acg]taccct",
                                                "agggtaa[cgt]|[acg]ttaccct");

    BiFunction<String, String, Entry<String, Long>> counts = (v, s) -> {
      Long count = Pattern.compile(v).splitAsStream(s).count() - 1; //Off by one
      return new AbstractMap.SimpleEntry<>(v, count);
    };

/*    final Map<String, Long> results = variants.parallelStream()
                                              .map(variant -> counts.apply(variant, sequence))
                                              .collect(toMap(Map.Entry::getKey, Map.Entry::getValue));
*/
    variants.forEach(variant -> System.out.println(variant + " " + results.get(variant)));

    System.out.println();
    System.out.println(initialLength);
    System.out.println(codeLength);
    System.out.println(replacements.join().length());
  }
}
    /*
notes, command-line, and program output
NOTES:
64-bit Ubuntu quad core
openjdk 16 2021-03-16
OpenJDK Runtime Environment (build 16+36-2231)
OpenJDK 64-Bit Server VM (build 16+36-2231, mixed mode, sharing)


Tue, 16 Mar 2021 19:07:17 GMT

MAKE:
mv regexredux.java-3.java regexredux.java
/opt/src/jdk-16/bin/javac -d . -cp . regexredux.java

1.70s to complete and log all make actions

COMMAND LINE:
/opt/src/jdk-16/bin/java  -cp . regexredux 0 < regexredux-input5000000.txt

PROGRAM OUTPUT:
agggtaaa|tttaccct 356
[cgt]gggtaaa|tttaccc[acg] 1250
a[act]ggtaaa|tttacc[agt]t 4252
ag[act]gtaaa|tttac[agt]ct 2894
agg[act]taaa|ttta[agt]cct 5435
aggg[acg]aaa|ttt[cgt]ccct 1537
agggt[cgt]aa|tt[acg]accct 1431
agggta[cgt]a|t[acg]taccct 1608
agggtaa[cgt]|[acg]ttaccct 2178

50833411
50000000
27388361
    
3-Clause BSD License*/
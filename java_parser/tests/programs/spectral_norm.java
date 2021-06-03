//https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/spectralnorm-java-3.html

/*The Computer Language
Benchmarks Game
spectral-norm Java #3 program
description

source code*/
/*
The Computer Language Benchmarks Game
https://salsa.debian.org/benchmarksgame-team/benchmarksgame/

contributed by Ziad Hatahet
based on the Go entry by K P anonymous
*/

import java.text.DecimalFormat;

public class spectralnorm {
    private static final DecimalFormat formatter = new DecimalFormat("#.000000000");
    private static final int NCPU = Runtime.getRuntime().availableProcessors();

    public static void main(String[] args) throws InterruptedException {
        final int n = args.length > 0 ? Integer.parseInt(args[0]) : 100;
        final var u = new double[n];
        for (int i = 0; i < n; i++)
            u[i] = 1.0;
        final var v = new double[n];
        for (int i = 0; i < 10; i++) {
            aTimesTransp(v, u);
            aTimesTransp(u, v);
        }

        double vBv = 0.0, vv = 0.0;
        for (int i = 0; i < n; i++) {
            final var vi = v[i];
            vBv += u[i] * vi;
            vv += vi * vi;
        }
        System.out.println(formatter.format(Math.sqrt(vBv / vv)));
    }

    private static void aTimesTransp(double[] v, double[] u) throws InterruptedException {
        final var x = new double[u.length];
        final var t = new Thread[NCPU];
        for (int i = 0; i < NCPU; i++) {
            t[i] = new Times(x, i * v.length / NCPU, (i + 1) * v.length / NCPU, u, false);
            t[i].start();
        }
        for (int i = 0; i < NCPU; i++)
            t[i].join();

        for (int i = 0; i < NCPU; i++) {
            t[i] = new Times(v, i * v.length / NCPU, (i + 1) * v.length / NCPU, x, true);
            t[i].start();
        }
        for (int i = 0; i < NCPU; i++)
            t[i].join();
    }

    private final static class Times extends Thread {
        private final double[] v, u;
        private final int ii, n;
        private final boolean transpose;

        public Times(double[] v, int ii, int n, double[] u, boolean transpose) {
            this.v = v;
            this.u = u;
            this.ii = ii;
            this.n = n;
            this.transpose = transpose;
        }

        @Override
        public void run() {
            final var ul = u.length;
            for (int i = ii; i < n; i++) {
                double vi = 0.0;
                for (int j = 0; j < ul; j++) {
                    if (transpose)
                        vi += u[j] / a(j, i);
                    else
                        vi += u[j] / a(i, j);
                }
                v[i] = vi;
            }
        }

        private static int a(int i, int j) {
            return (i + j) * (i + j + 1) / 2 + i + 1;
        }
    }
}
    /*
notes, command-line, and program output
NOTES:
64-bit Ubuntu quad core
openjdk 16 2021-03-16
OpenJDK Runtime Environment (build 16+36-2231)
OpenJDK 64-Bit Server VM (build 16+36-2231, mixed mode, sharing)


Tue, 16 Mar 2021 20:09:43 GMT

MAKE:
mv spectralnorm.java-3.java spectralnorm.java
/opt/src/jdk-16/bin/javac -d . -cp . spectralnorm.java

1.63s to complete and log all make actions

COMMAND LINE:
/opt/src/jdk-16/bin/java  -cp . spectralnorm 5500

PROGRAM OUTPUT:
1.274224153
    
3-Clause BSD License*/
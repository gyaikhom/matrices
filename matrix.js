/*
 * The MIT License
 *
 * Copyright 2012 Gagarine Yaikhom
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function(){

    /**
     * Creates a matrix object with the supplied number of rows and columns.
     *
     * @param {Integer} nrow Number of rows of the matrix.
     * @param {Integer} ncol Number of columns of the matrix.
     *
     * @return {Matrix} A matrix object.
     */
    Matrix = function(nrow, ncol) {
	var i, me = this;
	me.r = nrow;
	me.c = ncol;
	me.v = new Array(nrow);
	for (i = 0; i < nrow; ++i)
            me.v[i] = new Array(ncol);
	return me;
    }

    /**
     * Fills this matrix with values calculated using the supplied function.
     *
     * @param {Function} f A function that accepts row and column indices to
     *     produce a value.
     *
     * @return {Matrix} The modified matrix.
     */
    Matrix.prototype.fill = function(f) {
	var i, j, me = this;
	for (i = 0; i < me.r; ++i)
            for (j = 0; j < me.c; ++j)
		me.v[i][j] = f(i, j);
	return me;
    }

    /**
     * Swaps two columns in this matrix. By default, the matrix is modified after
     * the swapping. However, this behaviour can be disabled.
     *
     * @param {Integer} i The first column to swap.
     * @param {Integer} j The second column to swap.
     * @param {Boolean} [m] Should we leave the original matrix unmodified?
     *
     * @return {Matrix} A matrix with the columns swapped.
     */
    Matrix.prototype.swapColumns = function(i, j, m) {
	var me = this, r = undefined, k, t;
	if (0 <= i && i < me.c && 0 <= j && j < me.c) {
            r = m ? me.clone() : me;
            for (k = 0; k < me.r; ++k) {
		t = r.v[k][i];
		r.v[k][i] = r.v[k][j];
		r.v[k][j] = t;
            }
	}
	return r;
    }

    /**
     * Swaps two rows in this matrix. By default, the matrix is modified after
     * the swapping. However, this behaviour can be disabled.
     *
     * @param {Integer} i The first column to swap.
     * @param {Integer} j The second column to swap.
     * @param {Boolean} [m] Should we leave the original matrix unmodified?
     *
     * @return {Matrix} A matrix with the rows swapped.
     */
    Matrix.prototype.swapRows = function(i, j, m) {
	var me = this, r = undefined, k, t;
	if (0 <= i && i < me.r && 0 <= j && j < me.r) {
            r = m ? me.clone() : me;
            for (k = 0; k < me.c; ++k) {
		t = r.v[i][k];
		r.v[i][k] = r.v[j][k];
		r.v[j][k] = t;
            }
	}
	return r;
    }

    /**
     * Clones this matrix.
     *
     * @return {Matrix} A clone of this matrix.
     */
    Matrix.prototype.clone = function() {
	var me = this, r = new Matrix(me.r, me.c), i, j;
	for (i = 0; i < me.r; ++i)
            for (j = 0; j < me.c; ++j)
		r.v[i][j] = me.v[i][j];
	return r;
    }

    /**
     * Checks if the matrix is a square matrix.
     *
     * @return {Boolean} Returns <b>true</b> if matrix is square;
     *     otherwise, <b>false</b>.
     */
    Matrix.prototype.isSquare = function() {
	return this.c == this.r;
    }

    /**
     * Checks if this matrix equals the supplied matrix.
     *
     * @param {Matrix} m A matrix to compare.
     *
     * @return {Boolean} A <b>true</b> if the supplied matrix is equal to
     *     this matrix; otherwise, returns <b>false</b>.
     */
    Matrix.prototype.equals = function(m) {
	var i, j, r = true, me = this;
	if (m === null || !(m instanceof Matrix))
            r = undefined;
	else {
            if (me.r == m.r && me.c == m.c)
		for (i = 0; i < me.r; ++i) {
                    for (j = 0; j < me.c; ++j)
			if (me.v[i][j] !== m.v[i][j]) {
                            r = false;
                            break;
			}
                    if (!r) break;
		}
            else r = false;
	}
	return r;
    }

    /**
     * Checks if this matrix has the same order as the supplied matrix.
     *
     * @param {Matrix} m A matrix to compare.
     *
     * @return {Boolean | undefined } If the supplied object is not a matrix,
     *     <b>undefined</b> is returned. A <b>true</b> is returned if the supplied
     *     matrix has the same order as this matrix; otherwise, <b>false</b> is
     *     returned.
     */
    Matrix.prototype.isSameOrder = function(m) {
	var me = this;
	return (m === null || !(m instanceof Matrix)) ? undefined :
	    (me.r == m.r && me.c == m.c) ? true : false;
    }

    /**
     * Prints this matrix to the browser console.
     *
     * @param {String} [prefix] A prefix before the output.
     * @param {String} [suffix] A suffix after the output.
     *
     * @return {Matrix} The unmodified matrix.
     */
    Matrix.prototype.print = function(prefix, suffix) {
	var i, j, me = this;
	if (console) {
            if (prefix) console.log(prefix);
            for (i = 0; i < me.r; ++i)
		for (j = 0; j < me.c; ++j)
                    console.log(me.v[i][j]);
            if (suffix) console.log(suffix);
	} else alert('Could not print matrix: console is undefined!');
	return me;
    }

    /**
     * Returns the transpose of this matrix. The original matrix is left unmodified.
     *
     * @return {Matrix} A new matrix which is the transpose.
     */
    Matrix.prototype.transpose = function() {
	var i, j, me = this, t = new Matrix(me.c, me.r);
	for (i = 0; i < me.r; ++i)
            for (j = 0; j < me.c; ++j)
		t.v[j][i] = me.v[i][j];
	return t;
    }

    /**
     * Returns a scaled matrix after multiplying this matrix with the supplied
     * scalar quantity. By default, the original matrix will be modified; however,
     * this behaviour can be disabled.
     *
     * @param {Real} s The scalar quantity to multiply with.
     * @param {Boolean} [m] Should we leave the original matrix unmodified?
     *
     * @return {Matrix} A scaled matrix.
     */
    Matrix.prototype.scale = function(s, m) {
	var i, j, r = m && m == true ? this.clone() : this;
	for (i = 0; i < r.r; ++i)
            for (j = 0; j < r.c; ++j)
		r.v[i][j] *= s;
	return r;
    }

    /**
     * Multiplies this matrix to the supplied matrix. Both matrices are left
     * unmodified. If this matrix is <b>A</b> and the supplied matrix is <b>B</b>
     * and order is 'left', then the returned matrix is <b>B x A</b>; otherwise,
     * this method returns <b>A x B</b>. <i>By default, if the order is left
     * unspecified, multiplication to the right, i.e., <b>A x B</b>, is assumed.</i>
     * This matrix and the supplied matrix is never modified.
     *
     * @param {Matrix} m A matrix to multiply to.
     * @param {String} [o] Specifies the order of the multiplication.
     *
     * @return {Matrix | undefined} A matrix which is the product. If the
     *     supplied object is not a matrix, <b>undefined</b> is returned.
     */
    Matrix.prototype.multiply = function(m, o) {
	var i, j, k, r = undefined, me = this, a, b;
	if (m !== null && m instanceof Matrix) {
            if (o && o == 'left') {
		a = m;
		b = me;
            } else {
		a = me;
		b = m;
            }
            if (a.c == b.r) {
		r = new Matrix(a.r, b.c);
		for (i = 0; i < a.r; ++i)
                    for (j = 0; j < b.c; ++j) {
			r.v[i][j] = 0;
			for (k = 0; k < b.r; ++k)
                            r.v[i][j] += a.v[i][k] * b.v[k][j];
                    }
            }
	}
	return r;
    }

    /**
     * Calculates the Hadamard product of this matrix and the supplied matrix.
     * Both matrices are left unmodified.
     *
     * @param {Matrix} m A matrix to multiply with.
     *
     * @return {Matrix | undefined} A matrix which is the Hadamard product. If
     *     the supplied object is not a matrix, <b>undefined</b> is returned.
     */
    Matrix.prototype.hadamard = function(m) {
	var i, j, r = undefined, me = this;
	if (m !== null && m instanceof Matrix && me.isSameOrder(m)) {
            r = new Matrix(m.r, m.c);
            for (i = 0; i < m.r; ++i)
		for (j = 0; j < m.c; ++j)
                    r.v[i][j] = m.v[i][j] * me.v[i][j];
	}
	return r;
    }

    /**
     * Calculates the Kronecker product of this matrix and the supplied matrix.
     * Both matrices are left unmodified. If this matrix is <b>A</b> and the
     * supplied matrix is <b>B</b> and order is 'left', then the returned matrix
     * is <b>B x A</b>; otherwise, this method returns <b>A x B</b>. <i>By default,
     * if the order is left unspecified, multiplication to the right, i.e.,
     * <b>A x B</b>, is assumed.</i>
     *
     * @param {Matrix} m A matrix to multiply to.
     * @param {String} [o] Specifies the order of the multiplication.
     *
     * @return {Matrix | undefined} A matrix which is the Kronecker product. If
     *     the supplied object is not a matrix, <b>undefined</b> is returned.
     */
    Matrix.prototype.kronecker = function(m, o) {
	var i, j, k, l, r = undefined, me = this, a, b, x, y;
	if (m !== null && m instanceof Matrix) {
            r = new Matrix(me.r * m.r, me.c * m.c);
            if (o && o == 'left') {
		a = m;
		b = me;
            } else {
		a = me;
		b = m;
            }
            for (x = i = 0; i < a.r; ++i, x += b.r)
		for (y = j = 0; j < a.c; ++j, y += b.c)
                    for (k = 0; k < b.r; ++k)
			for (l = 0; l < b.c; ++l)
                            r.v[x + k][y + l] = a.v[i][j] * b.v[k][l];
	}
	return r;
    }

    /**
     * Returns a matrix which is the sum of this matrix and the supplied matrix.
     * By default, the original matrix will be modified; however,
     * this behaviour can be disabled. The supplied matrix is never modified.
     *
     * @param {Matrix} a A matrix to add.
     * @param {Boolean} [m] Should we leave the original matrix unmodified?
     *
     * @return {Matrix | undefined} A matrix which is the sum. If the
     *     supplied object is not a matrix, <b>undefined</b> is returned.
     */
    Matrix.prototype.add = function(a, m) {
	var i, j, r = undefined, me = this;
	if (me.isSameOrder(a)) {
            r = m && m == true ? this.clone() : me;
            for (i = 0; i < r.r; ++i)
		for (j = 0; j < r.c; ++j)
                    r.v[i][j] += a.v[i][j];
	}
	return r;
    }

    /**
     * Returns a matrix which is the difference of this matrix and the supplied
     * matrix. By default, the original matrix will be modified; however,
     * this behaviour can be disabled. The supplied matrix is never modified.
     *
     * @param {Matrix} a A matrix to subtract from current matrix.
     * @param {Boolean} [m] Should we leave the original matrix unmodified?
     *
     * @return {Matrix | undefined} A matrix which is the difference. If the
     *     supplied object is not a matrix, <b>undefined</b> is returned.
     */
    Matrix.prototype.subtract = function(a, m) {
	var i, j, r = undefined, me = this;
	if (me.isSameOrder(a)) {
            r = m && m == true ? this.clone() : me;
            for (i = 0; i < r.r; ++i)
		for (j = 0; j < r.c; ++j)
                    r.v[i][j] -= a.v[i][j];
	}
	return r;
    }

    /**
     * Creates an identity matrix object with the supplied order.
     *
     * @param {Integer} o Order of the matrix.
     *
     * @return {Matrix} A matrix object.
     */
    Matrix.prototype.Identity = function(o) {
	var i, j, m = new Matrix(o, o);
	for (i = 0; i < o; ++i) {
            for (j = 0; j < o; ++j)
		m.v[i][j] = 0;
            m.v[i][i] = 1;
	}
	return m;
    }

    /**
     * Creates an square matrix object with the supplied order.
     *
     * @param {Integer} o Order of the matrix.
     *
     * @return {Matrix} A matrix object.
     */
    Matrix.prototype.Square = function(o) {
	var i, j, m = new Matrix(o, o);
	for (i = 0; i < o; ++i)
            for (j = 0; j < o; ++j)
		m.v[i][j] = 0;
	return m;
    }

    /**
     * Calculates the trace of this matrix, if it is square.
     *
     * @return {Real | undefined} The trace of the square matrix, or undefined,
     *     if not square.
     */
    Matrix.prototype.trace = function() {
	var r = undefined, i, me = this;
	if (me.isSquare())
            for (r = 0, i = 0; i < me.r; ++i)
		r += me.v[i][i];
	return r;
    }

    /**
     * Checks if the matrix is a null matrix.
     *
     * @return {Boolean} Returns <b>true</b> if the matrix is null;
     *     otherwise, <b>false</b> is returned.
     */
    Matrix.prototype.isNull = function() {
	var i, j, me = this, r = true;
	for (i = 0; i < me.r; ++i) {
            for (j = 0; j < me.c; ++j)
		if (me.v[i][j] != 0) {
                    r = false;
                    break;
		}
            if (!r) break;
	}
	return r;
    }

    /**
     * Checks if the matrix is a zero matrix (which is the same as being null).
     *
     * @return {Boolean} Returns <b>true</b> if the matrix is a zero matrix;
     *     otherwise, <b>false</b> is returned.
     */
    Matrix.prototype.isZero = Matrix.prototype.isNull;

    /**
     * Checks if the matrix is a diagonal matrix.
     *
     * @return {Boolean} Returns <b>true</b> if the matrix is diagonal;
     *     otherwise, <b>false</b> is returned.
     */
    Matrix.prototype.isDiagonal = function() {
	var i, j, me = this, r = false;
	if (me.isSquare()) {
            r = true;
            for (i = 0; i < me.r; ++i) {
		for (j = 0; j < me.c; ++j)
                    if (i != j && me.v[i][j] != 0) {
			r = false;
			break;
                    }
		if (!r) break;
            }
	}
	return r;
    }

    /**
     * Checks if this matrix is upper triangular.
     *
     * @return {Boolean} If square and upper triangular, return <b>true</b>;
     *     otherwise, return <b>false</b>.
     */
    Matrix.prototype.isUpperTriangular = function() {
	var r = true, i, j, me = this;
	if (me.isSquare()) {
            for (i = 0; i < me.r; ++i) {
		for (j = 0; j < i; ++j)
                    if (me.v[i][j] !== 0) {
			r = false;
			break;
                    }
		if (!r) break;
            }
	} else r = false;
	return r;
    }

    /**
     * Checks if this matrix is lower triangular.
     *
     * @return {Boolean} If square and lower triangular, return <b>true</b>;
     *     otherwise, return <b>false</b>.
     */
    Matrix.prototype.isLowerTriangular = function() {
	var r = true, i, j, me = this;
	if (me.isSquare()) {
            for (i = 0; i < me.r; ++i) {
		for (j = i + 1; j < me.c; ++j)
                    if (me.v[i][j] !== 0) {
			r = false;
			break;
                    }
		if (!r) break;
            }
	} else r = false;
	return r;
    }

    /**
     * Checks if this matrix is symmetric.
     *
     * @return {Boolean} If square and symmetric, return <b>true</b>;
     *     otherwise, return <b>false</b>.
     */
    Matrix.prototype.isSymmetric = function() {
	var r = true, i, j, me = this;
	if (me.isSquare()) {
            for (i = 0; i < me.r; ++i) {
		for (j = 0; j < me.c; ++j)
                    if (me.v[i][j] !== me.v[j][i]) {
			r = false;
			break;
                    }
		if (!r) break;
            }
	} else r = false;
	return r;
    }

    /**
     * Checks if this matrix is skew-symmetric.
     *
     * @return {Boolean} If square and skew-symmetric, return <b>true</b>;
     *     otherwise, return <b>false</b>.
     */
    Matrix.prototype.isSkewSymmetric = function() {
	var r = true, i, j, me = this;
	if (me.isSquare()) {
            for (i = 0; i < me.r; ++i) {
		for (j = 0; j < me.c; ++j)
                    if (me.v[i][j] != -me.v[j][i]) {
			r = false;
			break;
                    }
		if (!r) break;
            }
	} else r = false;
	return r;
    }

    /**
     * Extracts lower/upper triangular factors from this matrix, which stores
     * a packed LU decomposition result (<b>L</b> as unit lower triangular matrix).
     *
     * @param {Boolean} l To extract the lower triangular matrix, pass <b>true</b>;
     *     otherwise, pass <b>false</b>.
     *
     * @return {Matrix | undefined } A lower/upper triangular matrix. If the
     *     LU decomposition is not a matrix, <b>undefined</b> is returned.
     */
    Matrix.prototype.luExtract = function(l) {
	var i, j, me = this, order = me.r, r = me.clone(), v = r.v;
	if (l)
            for (i = 0; i < order; ++i) {
		for (j = i + 1; j < order; ++j)
                    v[i][j] = 0;
		v[i][i] = 1;
            }
	else
            for (i = 0; i < order; ++i)
		for (j = 0; j < i; ++j)
                    v[i][j] = 0;
	return r;
    }

    /**
     * Separates the LU decomposition result into <b>L</b> and <b>U</b> factors.
     *
     * @return {Object | undefined} An object that contains two properties
     *     <i>L</i> and <i>U</i>, where, each respectively gives the <b>L</b> and
     *     <b>U</b> decomposition of this matrix is returned. If the matrix is
     *     not square, or LU decomposition not stable, <b>undefined</b> is
     *     returned.
     */
    Matrix.prototype.luSeparate = function() {
	var me = this;
	return {
            L: me.luExtract(true), /* extract lower triangular factor */
            U: me.luExtract(false) /* extract upper triangular factor */
	};
    }

    /**
     * Calculates the LU decomposition of this matrix without pivoting.
     *
     * <p>We use in-place decomposition, and the factors are separated out into
     * separate <b>L</b> and <b>U</b> matrices before they are returned.</p>
     *
     * <p>This separation into two matrices can be disabled, in which case,
     * both <b>L</b> and <b>U</b> are placed in the same matrix, with the
     * understanding that the diagonal of <b>L</b> is all 1s.</p>
     *
     * <p>This method leaves the current matrix unmodified.</p>
     *
     * @param {Boolean} [s] Should we disable separation of the <i>L</i>
     *     and <i>U</i> matrices? By default, do separate.
     *
     * @return {Matrix | Object | undefined} If separation is disabled, a
     *     single matrix with both <i>L</i> and <i>U</i> are returned.
     *     If separation is enabled, an object that contains two properties
     *     <i>L</i> and <i>U</i>, where, each respectively gives the <b>L</b> and
     *     <b>U</b> decomposition of this matrix is returned. If the matrix is
     *     not square, or LU decomposition not stable, <b>undefined</b> is
     *     returned.
     */
    Matrix.prototype.lu = function(s) {
	var me = this, r = undefined;
	if (me.isSquare()) {
            var t = me.clone(), i, j, k, x = me.r, y = x - 1, v = t.v;
            for (k = 0; k < y; ++k) {
		/* column normalisation */
		for (i = k + 1; i < x; ++i)
                    v[i][k] = v[i][k] / v[k][k];

		/* submatrix modification */
		for (i = k + 1; i < x; ++i)
                    for (j = k + 1; j < x; ++j)
			v[i][j] = v[i][j] - v[i][k] * v[k][j];
            }
            r = s && s == true ? t : t.luSeparate();
	}
	return r;
    }

    /**
     * Calculates the LU decomposition of this matrix using Doolittle algorithm.
     *
     * <p>We use in-place decomposition, and the factors are separated out into
     * separate <b>L</b> and <b>U</b> matrices before they are returned.</p>
     *
     * <p>This separation into two matrices can be disabled, in which case,
     * both <b>L</b> and <b>U</b> are placed in the same matrix, with the
     * understanding that the diagonal of <b>L</b> is all 1s.</p>
     *
     * <p>This method leaves the current matrix unmodified.</p>
     *
     * @param {Boolean} [s] Should we disable separation of the <i>L</i>
     *     and <i>U</i> matrices? By default, do separate.
     *
     * @return {Matrix | Object | undefined} If separation is disabled, a
     *     single matrix with both <i>L</i> and <i>U</i> are returned.
     *     If separation is enabled, an object that contains two properties
     *     <i>L</i> and <i>U</i>, where, each respectively gives the <b>L</b> and
     *     <b>U</b> decomposition of this matrix is returned. If the matrix is
     *     not square, or LU decomposition not stable, <b>undefined</b> is
     *     returned.
     */
    Matrix.prototype.doolittle = function(s) {
	var me = this, r = undefined;
	if (me.isSquare()) {
            var t = me.clone(), i, j, k, order = me.r, v = t.v;
            for (i = 0; i < order; ++i) {
		/* determine upper triangular factor */
		for (j = i; j < order; ++j)
                    for (k = 0; k < i; ++k)
			v[i][j] -= v[i][k] * v[k][j];
		if (v[i][i] == 0) {
                    t = undefined; /* this is a singular matrix */
                    break;
		}
		/* determine lower triangular factor */
		for (j = i + 1; j < order; ++j) {
                    for (k = 0; k < i; ++k)
			v[j][i] -= v[j][k] * v[k][i];
                    v[j][i] /= v[i][i];
		}
            }
            r = s && s == true ? t : t.luSeparate();
	}
	return r;
    }

    /**
     * Calculates the Cholesky decomposition of this matrix.
     *
     * <p>If the matrix <b>A</b> is symmetric and positive-definite, this method
     * returns a matrix <b>L</b> such that <b>A = LL*</b>, where <b>L</b> is a
     * lower triangular matrix with a strictly positive diagonal, and <b>L*</b> is
     * the transpose of <b>L</b>. This method does not modify the matrix.</p>
     *
     * <p><i> For now, we only deal with real numbers, and not imaginary numbers, in
     * which case <b>L*</b> should be the conjugate transpose of <b>L</b>.</i></p>
     *
     * @return {Matrix | undefined} If symmetric and positive-definite, <b>L</b>
     *     is returned; otherwise, <b>undefined</b> is returned.
     */
    Matrix.prototype.cholesky = function() {
	var me = this, r = undefined;
	if (me.isSymmetric()) {
            var i, j, k, x, y, s, order = me.r, v = me.v, w;
            r = new Matrix.Square(order);
            w = r.v;
            for (i = 0; r && i < order; ++i) {
		x = i + 1;
		for (j = 0; r && j < x; ++j) {
                    y = 0;
                    for (k = 0; k < j; ++k)
			y += w[i][k] * w[j][k];
                    if (i == j) {
			s = v[i][i] - y;
			if (s < 0) {
                            throw new Error('Matrix is not positive-definite');
                            r = undefined;
			} else w[i][i] = Math.sqrt(s);
                    } else w[i][j] = 1 / w[j][j] * (v[i][j] - y);
		}
            }
	}
	return r;
    }

})();
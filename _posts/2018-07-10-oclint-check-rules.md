---
layout: post
title:  "OCLint 的部分规则"
date:   2018-07-10
author: "袁凤鸣"
excerpt: OCLint规则:（Basic 部分）、（Unuseed 部分）、（Size 部分）、（Redundant 部分）、（Naming 部分）、（Migration 部分）、（Empty 部分）、（Design 部分）、（Convention 部分）、（CoCoa 部分）

categories: 
    - iOS
    - 转载
    - 报错调试
tags: 
    - OClint
mathjax: true

---
* content
{:toc}
---

# OCLint简介
<h4 id="oclint简介">OCLint简介</h4>

<blockquote>
  <p>OCLint is a static code analysis tool for improving quality and reducing defects by inspecting C, C++ and Objective-C code and looking for potential problems like possible bugs, unused code, complicated code, redundant code, code smells, bad practices, and so on.</p>
</blockquote>

<p>安装</p>

<blockquote>
  <p>$ brew tap oclint/formulae</p>
  
  <p>$ brew install oclint</p>
</blockquote>



<h3 id="using-oclint-with-xcodebuild">Using OCLint with xcodebuild</h3>

<p><code>xcodebuild -target DemoProject -configuration Debug -scheme DemoProject</code></p>



<h4 id="using-oclint-with-xctool">Using OCLint with xctool</h4>

<p>安装</p>

<blockquote>
  <p>$ brew install xctool –HEAD</p>
</blockquote>

<p><code>xctool -reporter json-compilation-database:compile_commands.json build</code></p>



<h3 id="using-oclint-with-xcpretty">Using OCLint with xcpretty</h3>

<p>安装</p>

<blockquote>
  <p>$ brew install xcpretty</p>
</blockquote>

<p><code>xcodebuild [flags] | xcpretty -r json-compilation-database -o compile_commands.json</code></p>



<h3 id="using-oclint-in-xcode">Using OCLint in Xcode</h3>

<ul>
<li><p>Add a new target in the project, and choose Aggregate as the template. <br>
</p><center> <br>
 <img src="http://osz3uubsl.bkt.clouddn.com/blog_8_2_git_undo_01.png" width="500" alt="图片名称" align="center"> <br>
</center><p></p></li>
<li><p>Name the new target, here we simply call it “OCLint”, you could have more than one targets that focus on different aspects of the code analysis.</p></li>
</ul>

<p></p><center> <br>
     <img src="http://osz3uubsl.bkt.clouddn.com/blog_8_2_git_undo_02.png" width="500" alt="图片名称" align="center"> <br>
</center><p></p>

<ul>
<li>Add a new build phase in the target we just created. Choose Add Run Script for the phase type.</li>
</ul>

<p></p><center> <br>
     <img src="http://osz3uubsl.bkt.clouddn.com/blog_8_2_git_undo_03.png" width="500" alt="图片名称" align="center"> <br>
</center><p></p>

<ul>
<li>Choose the correct build scheme, here we choose OCLint.Click to build, or use the shortcut Command+B.</li>
<li>Click to build, or use the shortcut Command+B.</li>
<li>When the progress bar scrolls to the very right, the analysis is done, then we can check out the analysis results same as compile warnings. </li>
</ul>

<p></p><center> <br>
     <img src="http://osz3uubsl.bkt.clouddn.com/blog_8_2_git_undo_04.png" width="500" alt="图片名称" align="center"> <br>
</center><p></p>


<br>

# OCLint规则 Basic 部分


<h4 id="1bitwise-operator-in-conditional">1、bitwise operator in conditional</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>since:0.6</code>  <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/BitwiseOperatorInConditionalRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Checks for bitwise operations in conditionals. Although being written on purpose in some rare cases, bitwise opera- tions are considered to be too “smart”. Smart code is not easy to understand.</p>
  
  <p>简单解释：OCLint认为<code>位运算符</code>可读性不好</p>
</blockquote>


<pre class="highlight"><code class=" hljs cs"><span class="hljs-keyword"> void</span> example(<span class="hljs-keyword">int</span> a, <span class="hljs-keyword">int</span> b) {
        <span class="hljs-keyword">if</span> (a | b) {
        }
        <span class="hljs-keyword">if</span> (a &amp; b) {
        }
     }</code></pre>



<h4 id="2broken-null-check">2、broken null check</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>since:0.7</code>   <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/BrokenNullCheckRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>The broken null check itself will crash the program.</p>
  
  <p>简单解释：错误的null检查会导致程序<code>crash</code>。</p>
</blockquote>



<pre class="highlight"><code class=" hljs livecodeserver">    void m(A *<span class="hljs-operator">a</span>, B *b) {
        <span class="hljs-keyword">if</span> (<span class="hljs-operator">a</span> != <span class="hljs-constant">NULL</span> || <span class="hljs-operator">a</span>-&gt;bar(b))
        {
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-operator">a</span> == <span class="hljs-constant">NULL</span> &amp;&amp; <span class="hljs-operator">a</span>-&gt;bar(b))
        {
        }
    }   </code></pre>

<blockquote>
  <p><font color="red">PS：</font>OC(objective-c)向空对象可以发消息，不会发生<code>crash</code>，但是上面这样的代码的逻辑是错误的。</p>
</blockquote>



<h4 id="3broken-nil-check">3、broken nil check</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/BrokenNullCheckRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>The broken nil check in Objective-C in some cases returns just the opposite result.</p>
  
  <p>简单解释：Objective-C中判空，有些情况下会返回预期相反的结果</p>
</blockquote>



<pre class="highlight"><code class="language-Objective-C hljs cs">    + (<span class="hljs-keyword">void</span>)compare:(A *)obj1 withOther:(A *)obj2 {
        <span class="hljs-keyword">if</span> (obj1 || [obj1 isEqualTo:obj2])
        {
        }
        <span class="hljs-keyword">if</span> (!obj1 &amp;&amp; ![obj1 isEqualTo:obj2])
        {
        }
    }</code></pre>

<blockquote>
  <p><font color="red">PS：</font>这样写应该是逻辑错误</p>
</blockquote>



<h4 id="4broken-oddness-check">4、broken oddness check</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/BrokenOddnessCheckRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Checking oddness by x % 2 == 1won’t work for negative numbers. Use x &amp; 1 == 1,or x % 2 != 0 instead.</p>
  
  <p>简单解释：对数字奇数性进行检查（x % 2 == 1），如果是负数，会有异常，应使用<code>x &amp; 1 == 1</code>或者<code>x % 2 != 0</code></p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example() {
        <span class="hljs-keyword">if</span> (x % <span class="hljs-number">2</span> == <span class="hljs-number">1</span>)         <span class="hljs-comment">// violation</span>
        {
        }
        <span class="hljs-keyword">if</span> (foo() % <span class="hljs-number">2</span> == <span class="hljs-number">1</span>)     <span class="hljs-comment">// violation</span>
        {
        }
    }</code></pre>

<blockquote>
  <p><font color="red">PS：</font>在Objective-C 上的测试结果上看，并没有什么大的异常。应该主要的问题是负数进行取模区的结果不会出现正值。 <br>
  比如（x % 2）的结果是<code>-1</code>或者<code>0</code>，</p>
</blockquote>



<h4 id="5collapsible-if-statements">5、collapsible if statements</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since: 0.6</code>  <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/CollapsibleIfStatementsRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where the conditions of two consecutive if statements can be combined into one in order to increase code cleanness and readability.</p>
  
  <p>简单解释：两个连续<code>if</code>条件可以合并的应该合并，可以提高可读性和代码整洁。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">bool</span> x, <span class="hljs-keyword">bool</span> y){
        <span class="hljs-keyword">if</span> (x)              <span class="hljs-comment">// these two if statements can be</span>
        {
            <span class="hljs-keyword">if</span> (y)          <span class="hljs-comment">// combined to if (x &amp;&amp; y)</span>
            {
                foo();
            }
        }
    }</code></pre>



<h4 id="6constant-conditional-operator">6、constant conditional operator</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since: 0.6</code>  <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/ConstantConditionalOperatorRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>conditional operator whose conditionals are always true or always false are confusing.</p>
  
  <p>简单解释：检查始终为<code>true</code>或者<code>false</code>的操作，会使人疑惑。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example() {
        <span class="hljs-keyword">int</span> a = <span class="hljs-number">1</span> == <span class="hljs-number">1</span> ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;     <span class="hljs-comment">// 1 == 1 is actually always true</span>
    }</code></pre>



<h4 id="7constant-if-expression">7、constant if expression</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since: 0.2</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/ConstantIfExpressionRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>if statements whose conditionals are always true or always false are confusing.</p>
  
  <p>简单解释：<code>if</code>始终为<code>true</code>或者<code>false</code>的操作，会使人疑惑。</p>
</blockquote>



<pre class="highlight"><code class=" hljs ruby">    void example(){
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">true</span>) {      <span class="hljs-regexp">//</span> always <span class="hljs-keyword">true</span>
            foo();
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-number">1</span> == <span class="hljs-number">0</span>) {    <span class="hljs-regexp">//</span> always <span class="hljs-keyword">false</span>
            bar();
        }
    }</code></pre>



<h4 id="8-dead-code">8、 dead code</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since: 0.4</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/DeadCodeRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Code after return, break, continue, and throw statements is unreachable and will never be executed.</p>
  
  <p>简单解释：在 <code>return</code>、 <code>break</code>、 <code>continue</code> and <code>throw</code> 之后的代码都是无效的</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">id</span> collection) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">id</span> it in collection) {
            <span class="hljs-keyword">continue</span>;
            <span class="hljs-keyword">int</span> i1;                 <span class="hljs-comment">// dead code</span>
        }
        <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">int</span> i2;                     <span class="hljs-comment">// dead code</span>
    }</code></pre>



<h4 id="9double-negative">9、double negative</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/DoubleNegativeRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>There is no point in using a double negative, it is always positive.</p>
  
  <p>简单解释：代码中双重否定没有意义</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example() {
        <span class="hljs-keyword">int</span> b1 = !!<span class="hljs-number">1</span>;
        <span class="hljs-keyword">int</span> b2 = ~~<span class="hljs-number">1</span>;
    }</code></pre>



<h4 id="10for-loop-should-be-while-loop">10、for loop should be while loop</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/ForLoopShouldBeWhileLoopRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Under certain circumstances, some for loops can be simplified to while loops to make code more concise.</p>
  
  <p>简单解释：在有些情况下使用<code>while</code>比使用<code>for</code>更简洁</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">for</span> (; a &lt; <span class="hljs-number">100</span>;) {
            foo(a);
        }
    }</code></pre>



<h4 id="11-goto-statement">11、 goto statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/GotoStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p><a href="http://www.cs.utexas.edu/users/EWD/ewd02xx/EWD215.PDF" rel="nofollow" target="_blank">Go To Statement Considered Harmful</a></p>
  
  <p>简单解释：<a href="http://www.cs.utexas.edu/users/EWD/ewd02xx/EWD215.PDF" rel="nofollow" target="_blank"><code>go to</code>被认为有害的 </a></p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example() {
        A:
            a();
        <span class="hljs-keyword">goto</span> A;     <span class="hljs-comment">// Considered Harmful</span>
    }</code></pre>



<h4 id="12jumbled-incrementer">12、jumbled incrementer</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/JumbledIncrementerRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Jumbled incrementers are usually typos. If it’s done on purpose, it’s very confusing for code readers.</p>
  
  <p>简单解释：混乱的迭代器通常会出现错误，可读性不好。</p>
</blockquote>



<pre class="highlight"><code class=" hljs perl">    void aMethod(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; a; i++) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> j = <span class="hljs-number">0</span>; j &lt; a; i++) {     <span class="hljs-regexp">//</span> references both <span class="hljs-string">'i'</span> <span class="hljs-keyword">and</span> <span class="hljs-string">'j'</span>
            }
        }
    }</code></pre>



<h4 id="13misplaced-null-check">13、misplaced null check</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/MisplacedNullCheckRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>The null check is misplaced. In C and C++, sending a message to a null pointer could crash the program. When null is misplaced, either the check is useless or it’s incorrect.</p>
  
  <p>简单解释：<code>C</code>和<code>C++</code>在条件判断的时候注意<code>null</code>判断放在前面，<code>逻辑短路</code>。</p>
</blockquote>



<pre class="highlight"><code class=" hljs livecodeserver">    void m(A *<span class="hljs-operator">a</span>, B *b) {
        <span class="hljs-keyword">if</span> (<span class="hljs-operator">a</span>-&gt;bar(b) &amp;&amp; <span class="hljs-operator">a</span> != <span class="hljs-constant">NULL</span>) {<span class="hljs-comment"> // violation </span>
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-operator">a</span>-&gt;bar(b) || !<span class="hljs-operator">a</span>) {       <span class="hljs-comment"> // violation</span>
        }
    }</code></pre>



<h4 id="14misplaced-nil-check">14、misplaced nil check</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/MisplacedNullCheckRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>The nil check is misplaced. In Objective-C, sending a message to a nil pointer simply does nothing. But code readers may be confused about the misplaced nil check.</p>
  
  <p>简单解释：<code>Objective-C</code>在条件判断的时候注意<code>nil</code>判断放在前面，<code>逻辑短路</code>。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    + (<span class="hljs-keyword">void</span>)compare:(A *)obj1 withOther:(A *)obj2 {
        <span class="hljs-keyword">if</span> ([obj1 isEqualTo:obj2] &amp;&amp; obj1) {
        }
        <span class="hljs-keyword">if</span> (![obj1 isEqualTo:obj2] || obj1 == <span class="hljs-literal">nil</span>)   {
        }
    }</code></pre>



<h4 id="15-multiple-unary-operator">15、 multiple unary operator</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/MultipleUnaryOperatorRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Multiple unary operator can always be confusing and should be simplified.</p>
  
  <p>简单解释：多重的运算符不易理解，应该简化。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example() {
        <span class="hljs-keyword">int</span> b = -(+(!(~<span class="hljs-number">1</span>)));
    }</code></pre>



<h4 id="16return-from-finally-block">16、return from finally block</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/basic/ReturnFromFinallyBlockRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Returning from a finally block is not recommended.</p>
  
  <p>简单解释：不建议在finally中返回</p>
</blockquote>



<pre class="highlight"><code class=" hljs scss">    void <span class="hljs-function">example()</span> {
        <span class="hljs-at_rule">@try {</span>
            <span class="hljs-function">foo()</span>;
        }
        <span class="hljs-at_rule">@<span class="hljs-function">catch(id ex)</span> {</span>
            <span class="hljs-function">bar()</span>;
        }
        <span class="hljs-at_rule">@finally {</span>
            return;         <span class="hljs-comment">// this can discard exceptions.</span>
        }
    }</code></pre>



<h4 id="17throw-exception-from-finally-block">17、throw exception from finally block</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="--" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Throwing exceptions within a finally block may mask other exceptions or code defects.</p>
  
  <p>简单解释：从finally块抛出异常，可能忽略其他的错误</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-keyword">void</span> example() {
        <span class="hljs-keyword">@try</span> {;}
        <span class="hljs-keyword">@catch</span>(<span class="hljs-keyword">id</span> ex) {;}
        <span class="hljs-keyword">@finally</span> {
            <span class="hljs-keyword">id</span> ex1;
            <span class="hljs-keyword">@throw</span> ex1;                              <span class="hljs-comment">// this throws an exception</span>
            <span class="hljs-built_in">NSException</span> *ex2 = [<span class="hljs-built_in">NSException</span> new];
            [ex2 raise];                             <span class="hljs-comment">// this throws an exception, too</span>
        }
    }</code></pre>  




# OCLint规则 Unuseed 部分

<h4 id="1unused-local-variable">1、unused local variable</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.4</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/unused/UnusedLocalVariableRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects local variables that are declared, but not used.</p>
  
  <p>简单解释：有局部变量没有使用。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">int</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">int</span> i;          <span class="hljs-comment">// variable i is declared, but not used</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    }</code></pre>

<blockquote>
  <p>Suppress: <br>
  <code>__attribute__((annotate("oclint:suppress[unused local variable]")))</code></p>
</blockquote>



<h4 id="2unused-method-parameter">2、unused method parameter</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.4</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/unused/UnusedMethodParameterRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects parameters that are not used in the method.</p>
  
  <p>简单解释：方法参数没有被使用.</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">int</span> example(<span class="hljs-keyword">int</span> a)  <span class="hljs-comment">// parameter a is not used {</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    }</code></pre>

<blockquote>
  <p>Suppress: <br>
  <code>__attribute__((annotate("oclint:suppress[unused method parameter]")))</code></p>
</blockquote>   


# OCLint规则 Size 部分 


<h4 id="1high-cyclomatic-complexity">1、high cyclomatic complexity</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.4</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/CyclomaticComplexityRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>Cyclomatic complexity is determined by the number of linearly independent paths through a program’s source code. In other words, cyclomatic complexity of a method is measured by the number of decision points, like if, while, and for statements, plus one for the method entry.</p>
  
  <p>简单解释：圈复杂度过高。统计一个函数有多少个分支(if, while,for,等等)，没有的话复杂度为一，每增加一个分支复杂度加一。简单计算的话V(G)=e-n+2。其中，e表示控制流图中边的数量，n表示控制流图中节点的数量，或者V(G)=区域数=判定节点数+1。当然可以数一数。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a, <span class="hljs-keyword">int</span> b, <span class="hljs-keyword">int</span> c) { <span class="hljs-comment">// 1</span>
        <span class="hljs-keyword">if</span> (a == b) {                   <span class="hljs-comment">// 2</span>
            <span class="hljs-keyword">if</span> (b == c) {               <span class="hljs-comment">// 3 </span>
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (a == c){          <span class="hljs-comment">// 3</span>
            }
            <span class="hljs-keyword">else</span> {
            }
        }
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">int</span> i = <span class="hljs-number">0</span>; i &lt; c; i++)  {  <span class="hljs-comment">// 4</span>
        }
        <span class="hljs-keyword">switch</span>(c)  {
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:                   <span class="hljs-comment">// 5</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:                   <span class="hljs-comment">// 6</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:                  <span class="hljs-comment">// 7</span>
                <span class="hljs-keyword">break</span>;
        }
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  CYCLOMATIC_COMPLEXITY The cyclomatic complexity reporting threshold, default value is 10. Suppress:</p>
  
  <p>Suppress: <br>
  <code>__attribute__((annotate("oclint:suppress[high cyclomatic complexity]")))</code></p>
  
  <p>References: <br>
  McCabe (December 1976). <a href="http://www.literateprogramming.com/mccabe.pdf" rel="nofollow">“A Complexity Measure”</a>. IEEE Transactions on Software Engineering: 308–320</p>
</blockquote>



<h4 id="2long-class">2、long class</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/LongClassRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>Long class generally indicates that this class tries to do many things. Each class should do one thing and that one thing well.</p>
  
  <p>简单解释：类行数太多。</p>
</blockquote>



<pre class="highlight"><code class=" hljs actionscript">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> {</span>
        <span class="hljs-keyword">void</span> bar() {
            <span class="hljs-comment">// 1001 lines of code</span>
        }
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  LONG_CLASS The class size reporting threshold, default value is 1000.</p>
</blockquote>



<h4 id="3-long-line">3、 long line</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/LongLineRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>When the number of characters for one line of code is very high, it largely harms the readability. Break long lines of code into multiple lines.</p>
  
  <p>简单解释：单行代码太长，影响可读性。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example()
    {
        <span class="hljs-keyword">int</span> a012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789;
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  LONG_LINE The long line reporting threshold, default value is 100.</p>
</blockquote>



<h4 id="4long-method">4、long method</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/LongMethodRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>Long method generally indicates that this method tries to do many things. Each method should do one thing and that one thing well.</p>
  
  <p>简单解释：方法太长，影响阅读，应该实现单一职责。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cpp">    <span class="hljs-keyword">void</span> example() {
        <span class="hljs-built_in">cout</span> &lt;&lt; <span class="hljs-string">"hello world"</span>;
        <span class="hljs-built_in">cout</span> &lt;&lt; <span class="hljs-string">"hello world"</span>;
        <span class="hljs-comment">// repeat 48 times</span>
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  LONG_METHOD The long method reporting threshold, default value is 50.</p>
</blockquote>



<h4 id="5-high-ncss-method">5、 high ncss method</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/NcssMethodCountRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule counts number of lines for a method by counting Non Commenting Source Statements (NCSS). NCSS only takes actual statements into consideration, in other words, ignores empty statements, empty blocks, closing brackets or semicolons after closing brackets. Meanwhile, a statement that is broken into multiple lines contribute only one count.</p>
  
  <p>简单解释：其实是指某个代码块中代码行数过多（只统计有效的语句），查看代码块中代码是否能拆分，公共功能能否提供一个公共接口。空语句，空块，右括号或分号后的右括号会被忽略。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example()          <span class="hljs-comment">// 1</span>
    {
        <span class="hljs-keyword">if</span> (<span class="hljs-number">1</span>)              <span class="hljs-comment">// 2</span>
        {
        }  <span class="hljs-keyword">else</span>                <span class="hljs-comment">// 3</span>
        {
        }
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  NCSS_METHOD The high NCSS method reporting threshold, default value is 30.</p>
  
  <p>Suppress: <br>
  <strong>attribute</strong>((annotate(“oclint:suppress[high ncss method]”)))</p>
</blockquote>



<h4 id="6deep-nested-block">6、deep nested block</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/NestedBlockDepthRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule indicates blocks nested more deeply than the upper limit.</p>
  
  <p>简单解释：嵌套块是否超过指定的深度值.</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">if</span> (<span class="hljs-number">1</span>) {               <span class="hljs-comment">// 1</span>
        {           <span class="hljs-comment">// 2</span>
            {       <span class="hljs-comment">// 3</span>
            }
        }
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  NESTED_BLOCK_DEPTH The depth of a block or compound statement reporting threshold, default value is 5.</p>
</blockquote>



<h4 id="7high-npath-complexity">7、high npath complexity</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.4</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/NPathComplexityRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>NPath complexity is determined by the number of execution paths through that method. Compared to cyclomatic complexity, NPath complexity has two outstanding characteristics: first, it distinguishes between different kinds of control flow structures; second, it takes the various type of acyclic paths in a flow graph into consideration. <br>
  Based on studies done by the original author in AT&amp;T Bell Lab, an NPath threshold value of 200 has been established for a method.</p>
  
  <p>简单解释：NPath复杂度是一个方法中各种可能的执行路径总和,一般把200作为考虑降低复杂度的临界点，这里提示NPath复杂度过高。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example() {
        <span class="hljs-comment">// complicated code that is hard to understand</span>
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  NPATH_COMPLEXITY The NPath complexity reporting threshold, default value is 200. </p>
  
  <p>Suppress: <br>
  <code>__attribute__((annotate("oclint:suppress[high npath complexity]")))</code></p>
  
  <p>References: <br>
  Brian A. Nejmeh (1988). <a href="http://dl.acm.org/citation.cfm?id=42379" rel="nofollow">“NPATH: a measure of execution path complexity and its applications”</a>. Communications of the ACM 31 (2) p. 188-200</p>
</blockquote>



<h4 id="8too-many-fields">8、too many fields</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/TooManyFieldsRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>A class with too many fields indicates it does too many things and lacks proper abstraction. It can be redesigned to have fewer fields.</p>
  
  <p>简单解释：一个类中有定义太多东西，需要进行适当的抽象、设计。</p>
</blockquote>



<pre class="highlight"><code class=" hljs r">    class c {
        int a, b;
        int c;
        // <span class="hljs-keyword">...</span>
        int l;
        int m, n;
        // <span class="hljs-keyword">...</span>
        int x, y, z;
        void m() {}
    };</code></pre>

<blockquote>
  <p>Thresholds: <br>
  TOO_MANY_FIELDS The reporting threshold for too many fields, default value is 20.</p>
</blockquote>



<h4 id="9too-many-methods">9、too many methods</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/TooManyMethodsRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>A class with too many methods indicates it does too many things and is hard to read and understand. It usually contains complicated code, and should be refactored.</p>
  
  <p>简单解释：一个类有太多的方法，证明他做了太多的事儿，不利于理解。应该考虑重构。考虑单一职责。</p>
</blockquote>



<pre class="highlight"><code class=" hljs r">    class c {
        int a();
        int b();
        int c();
        // <span class="hljs-keyword">...</span>
        int l();
        int m();
        int n();
        // <span class="hljs-keyword">...</span>
        int x();
        int y();
        int z();
        int aa();
        int ab();
        int ac();
        int ad();
        int ae();
    };</code></pre>



<h4 id="10too-many-parameters">10、too many parameters</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/size/TooManyParametersRule.cpp" rel="nofollow">定义类传送门～点击</a></p>

<blockquote>
  <p>Methods with too many parameters are hard to understand and maintain, and are thirsty for refactorings, like Replace Parameter With method, Introduce Parameter Object, or Preserve Whole Object.</p>
  
  <p>简单解释： 一个方法中参数过多。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a, <span class="hljs-keyword">int</span> b, <span class="hljs-keyword">int</span> c, <span class="hljs-keyword">int</span> d, <span class="hljs-keyword">int</span> e, <span class="hljs-keyword">int</span> f,
        <span class="hljs-keyword">int</span> g, <span class="hljs-keyword">int</span> h, <span class="hljs-keyword">int</span> i, <span class="hljs-keyword">int</span> j, <span class="hljs-keyword">int</span> k, <span class="hljs-keyword">int</span> l) {
    }</code></pre>

<blockquote>
  <p>TOO_MANY_PARAMETERS The reporting threshold for too many parameters, default value is 10. </p>
  
  <p>References: <br>
  Fowler, Martin (1999). Refactoring: Improving the design of existing code. Addison Wesley.</p>
</blockquote>  


# OCLint规则 Redundant 部分


<h4 id="1redundant-conditional-operator">1、redundant conditional operator</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/redundant/RedundantConditionalOperatorRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects three types of redundant conditional operators:</p>
  
  <ol>
  <li>true expression and false expression are returning true/false or false/true respectively; </li>
  <li>true expression and false expression are the same constant;</li>
  <li>true expression and false expression are the same variable expression.</li>
  </ol>
  
  <p>They are usually introduced by mistake, and should be simplified.</p>
  
  <p>简单解释：冗余的条件判断会造成一些错误，应该让它变得简洁。</p>
  
  <p>比如： 1.<code>true</code>对应<code>true</code>。<code>false</code>对应<code>false</code>。</p>
  
  <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2 . <code>true</code>对应<code>false</code>。<code>false</code>对应<code>true</code>。</p>
  
  <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;3 . <code>true</code>和<code>false</code>一致。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a, <span class="hljs-keyword">int</span> b, <span class="hljs-keyword">int</span> c) {
        <span class="hljs-keyword">bool</span> b1 = a &gt; b ? <span class="hljs-keyword">true</span> : <span class="hljs-keyword">false</span>;     <span class="hljs-comment">// true/false: bool b1 = a &gt; b;</span>
        <span class="hljs-keyword">bool</span> b2 = a &gt; b ? <span class="hljs-keyword">false</span> : <span class="hljs-keyword">true</span>;     <span class="hljs-comment">// false/true: bool b2 = !(a &gt; b);</span>
        <span class="hljs-keyword">int</span> i1 = a &gt; b ? <span class="hljs-number">1</span> : <span class="hljs-number">1</span>;             <span class="hljs-comment">// same constant: int i1 = 1;</span>
        <span class="hljs-keyword">float</span> f1 = a &gt; b ? <span class="hljs-number">1.0</span> : <span class="hljs-number">1.00</span>;      <span class="hljs-comment">// equally constant: float f1 = 1.0;</span>
        <span class="hljs-keyword">int</span> i2 = a &gt; b ? c : c;             <span class="hljs-comment">// same variable: int i2 = c;</span>
    }</code></pre>



<h4 id="2redundant-if-statement">2、redundant if statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.4</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/redundant/RedundantIfStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects unnecessary if statements.</p>
  
  <p>简单解释：多余的if判断，可以省略。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">bool</span> example(<span class="hljs-keyword">int</span> a, <span class="hljs-keyword">int</span> b) {
        <span class="hljs-keyword">if</span> (a == b)             <span class="hljs-comment">// this if statement is redundant</span>
        {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
        }  <span class="hljs-keyword">else</span>   {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
        }                       <span class="hljs-comment">// the entire method can be simplified to return a == b;</span>
    }</code></pre>



<h4 id="3redundant-local-variable">3、redundant local variable</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.4</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/redundant/RedundantIfStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects cases where a variable declaration is immediately followed by a return of that variable.</p>
  
  <p>简单解释：冗余的局部变量，可以省略，直接<code>return</code>。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">int</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">int</span> b = a * <span class="hljs-number">2</span>;
        <span class="hljs-keyword">return</span> b;   <span class="hljs-comment">// variable b is returned immediately after its declaration,</span>
    }</code></pre>



<h4 id="4redundant-nil-check">4、redundant nil check</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/redundant/RedundantNilCheckRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>C/C++-style null check in Objective-C like foo != nil &amp;&amp; [foo bar] is redundant, since sending a message to a nil object in this case simply returns a false-y value.</p>
  
  <p>简单解释：在C或者C++中适用的判空检查在OC中是多余的。因为在OC中向空对象发送消息会返回false值。</p>
</blockquote>



<pre class="highlight"><code class=" hljs coffeescript">    + (<span class="hljs-reserved">void</span>)<span class="hljs-attribute">compare</span>:(A *)obj1 <span class="hljs-attribute">withOther</span>:(A *)obj2  {
        <span class="hljs-keyword">if</span> (obj1 &amp;&amp; [obj1 <span class="hljs-attribute">isEqualTo</span>:obj2]) <span class="hljs-regexp">//</span> <span class="hljs-keyword">if</span> ([obj1 <span class="hljs-attribute">isEqualTo</span>:obj2]) <span class="hljs-keyword">is</span> okay   {
        }
    }</code></pre>



<h4 id="5-unnecessary-else-statement">5、 unnecessary else statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/redundant/UnnecessaryElseStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>When an if statement block ends with a return statement, or all branches in the if statement block end with return statements, then the else statement is unnecessary. The code in the else statement can be run without being in the block.</p>
  
  <p>简单解释：如果if中已经带有return，则不需要写else语句。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cpp">    <span class="hljs-keyword">bool</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">if</span> (a == <span class="hljs-number">1</span>)                 <span class="hljs-comment">// if (a == 1)</span>
        {                           <span class="hljs-comment">// {</span>
            <span class="hljs-built_in">cout</span> &lt;&lt; <span class="hljs-string">"a is 1."</span>;      <span class="hljs-comment">//     cout &lt;&lt; "a is 1.";</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;            <span class="hljs-comment">//     return true;</span>
        }                           <span class="hljs-comment">// }</span>
        <span class="hljs-keyword">else</span>                        <span class="hljs-comment">//</span>
        {                           <span class="hljs-comment">//</span>
            <span class="hljs-built_in">cout</span> &lt;&lt; <span class="hljs-string">"a is not 1."</span>   <span class="hljs-comment">// cout &lt;&lt; "a is not 1."</span>
        }                           <span class="hljs-comment">//</span>
    }
</code></pre>



<h4 id="6unnecessary-null-check-for-dealloc">6、unnecessary null check for dealloc</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/redundant/UnnecessaryNullCheckForCXXDeallocRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>char* p = 0; delete p;isvalid.Thisrulelocatesunnecessaryif (p)checks.</p>
  
  <p>简单解释：在dealloc中不需要判空，就能Delete元素。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cpp">    <span class="hljs-keyword">void</span> m(<span class="hljs-keyword">char</span>* c) {
        <span class="hljs-keyword">if</span> (c != <span class="hljs-keyword">nullptr</span>) { <span class="hljs-comment">// and be simplified to delete c;</span>
            <span class="hljs-keyword">delete</span> c;
        }
    }</code></pre>



<h4 id="7-useless-parentheses">7、 useless parentheses</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/redundant/UselessParenthesesRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects useless parentheses.</p>
  
  <p>简单解释：检查无用的括号。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">int</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">int</span> y = (a + <span class="hljs-number">1</span>);    <span class="hljs-comment">// int y = a + 1;</span>
        <span class="hljs-keyword">if</span> ((y &gt; <span class="hljs-number">0</span>))        <span class="hljs-comment">// if (y &gt; 0)</span>
        {
            <span class="hljs-keyword">return</span> a;
        }
        <span class="hljs-keyword">return</span> (<span class="hljs-number">0</span>);         <span class="hljs-comment">// return 0;</span>
    }</code></pre>

<blockquote>
  <p><font color="red">PS：</font>检测了一下在括号里是逻辑判断时不会被检测到,如下（不会被检查到）：</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-built_in">BOOL</span> aaaa = <span class="hljs-literal">YES</span>;
    <span class="hljs-built_in">BOOL</span> bbbb = <span class="hljs-literal">NO</span>;
     <span class="hljs-keyword">if</span>((aaaa) &amp;&amp; (bbbb)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">YES</span>;
      }</code></pre>  



# OCLint规则 Naming 部分


<h4 id="1long-variable-name">1、long variable name</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/naming/LongVariableNameRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Variables with long names harm readability.</p>
  
  <p>简单解释：变量名较长，影响可读性。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> aMethod() {
        <span class="hljs-keyword">int</span> reallyReallyLongIntegerName;
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  LONG_VARIABLE_NAME The long variable name reporting threshold, default value is 20.</p>
</blockquote>



<h4 id="2hort-variable-name">2、hort variable name</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/naming/ShortVariableNameRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>A variable with a short name is hard to understand what it stands for. Variable with name, but the name has number of characters less than the threshold will be emitted.</p>
  
  <p>简单解释：变量名太短，影响可读性。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> aMethod(<span class="hljs-keyword">int</span> i)  <span class="hljs-comment">// i is short</span>
    {
        <span class="hljs-keyword">int</span> ii;          <span class="hljs-comment">// ii is short</span>
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  SHORT_VARIABLE_NAME The short variable name reporting threshold, default value is 3.</p>
</blockquote>


# OCLint规则 Migration 部分 


<h4 id="1use-boxed-expression">1、use boxed expression</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/migration/ObjCBoxedExpressionsRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule locates the places that can be migrated to the new Objective-C literals with boxed expressions.</p>
  
  <p>简单解释：建议使用新方法，快速创建（<code>numberWithInt</code>和<code>stringWithUTF8String:</code>）。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-keyword">void</span> aMethod() {
        <span class="hljs-built_in">NSNumber</span> *fortyTwo = [<span class="hljs-built_in">NSNumber</span> numberWithInt:(<span class="hljs-number">43</span> - <span class="hljs-number">1</span>)];
        <span class="hljs-comment">// NSNumber *fortyTwo = @(43 - 1);</span>
        <span class="hljs-built_in">NSString</span> *env = [<span class="hljs-built_in">NSString</span> stringWithUTF8String:getenv(<span class="hljs-string">"PATH"</span>)];
        <span class="hljs-comment">// NSString *env = @(getenv("PATH"));</span>
    }</code></pre>



<h4 id="2-use-container-literal">2、 use container literal</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/migration/ObjCContainerLiteralsRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule locates the places that can be migrated to the new Objective-C literals with container literals.</p>
  
  <p>简单解释：建议使用新方法，快速创建（<code>arrayWithObjects</code>和<code>dictionaryWithObjects</code>）。</p>
</blockquote>



<pre class="highlight"><code class=" hljs perl">    void aMethod()
    {
        NSArray <span class="hljs-variable">*a</span> = [NSArray arrayWithObjects:<span class="hljs-variable">@1</span>, <span class="hljs-variable">@2</span>, <span class="hljs-variable">@3</span>, nil];
        <span class="hljs-regexp">//</span> NSArray <span class="hljs-variable">*a</span> = <span class="hljs-variable">@[</span> <span class="hljs-variable">@1</span>, <span class="hljs-variable">@2</span>, <span class="hljs-variable">@3</span> ];
        NSDictionary <span class="hljs-variable">*d</span> = [NSDictionary dictionaryWithObjects:<span class="hljs-variable">@[</span><span class="hljs-variable">@2</span>,<span class="hljs-variable">@4</span>] forKeys:<span class="hljs-variable">@[</span><span class="hljs-variable">@1</span>,<span class="hljs-variable">@3</span>]];
        <span class="hljs-regexp">//</span> NSDictionary <span class="hljs-variable">*d</span> = @{ <span class="hljs-variable">@1</span> : <span class="hljs-variable">@2</span>, <span class="hljs-variable">@3</span> : <span class="hljs-variable">@4</span> };
    }</code></pre>



<h4 id="3use-number-literal">3、use number literal</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/migration/ObjCNSNumberLiteralsRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule locates the places that can be migrated to the new Objective-C literals with number literals.</p>
  
  <p>简单解释：建议使用新方法，快速创建（<code>numberWithInt</code>和<code>numberWithBOOL</code>）。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-keyword">void</span> aMethod() {
        <span class="hljs-built_in">NSNumber</span> *fortyTwo = [<span class="hljs-built_in">NSNumber</span> numberWithInt:<span class="hljs-number">42</span>];
        <span class="hljs-comment">// NSNumber *fortyTwo = @42;</span>
        <span class="hljs-built_in">NSNumber</span> *yesBool = [<span class="hljs-built_in">NSNumber</span> numberWithBool:<span class="hljs-literal">YES</span>];
        <span class="hljs-comment">// NSNumber *yesBool = @YES;</span>
    }</code></pre>



<h4 id="4use-object-subscripting">4、use object subscripting</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/migration/ObjCObjectSubscriptingRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule locates the places that can be migrated to the new Objective-C literals with object subscripting.</p>
  
  <p>简单解释：建议使用新方法，快速创建（<code>objectAtIndex</code>和<code>objectForKey</code>）。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-keyword">void</span> aMethod(<span class="hljs-built_in">NSArray</span> *a, <span class="hljs-built_in">NSDictionary</span> *d) {
        <span class="hljs-keyword">id</span> item = [a objectAtIndex:<span class="hljs-number">0</span>];
        <span class="hljs-comment">// id item = a[0];</span>
        <span class="hljs-keyword">id</span> item = [d objectForKey:@<span class="hljs-number">1</span>];
        <span class="hljs-comment">// id item = d[@1];</span>
    }</code></pre> 
    

# OCLint规则 Empty 部分 


<h4 id="1empty-catch-statement">1、empty catch statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptyCatchStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where an exception is caught, but nothing is done about it.</p>
  
  <p>简单解释：捕获了异常，在Catch中什么都没有做的情况。</p>
</blockquote>



<pre class="highlight"><code class=" hljs r">    void example()  {
        <span class="hljs-keyword">try</span> {
            int* m= new int[<span class="hljs-number">1000</span>];
        }
        catch(<span class="hljs-keyword">...</span>)                  // empty catch statement, this swallows an exception
        {
        }
    }</code></pre>



<h4 id="2empty-dowhile-statement">2、empty do/while statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptyDoWhileStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where do-while statement does nothing.</p>
  
  <p>简单解释：空的<code>do-while</code>检查。</p>
</blockquote>



<pre class="highlight"><code class=" hljs ruby">    void example() {
        <span class="hljs-keyword">do</span>
        {                           <span class="hljs-regexp">//</span> empty <span class="hljs-keyword">do</span>-<span class="hljs-keyword">while</span> statement
        } <span class="hljs-keyword">while</span>(<span class="hljs-number">1</span>);
    }</code></pre>



<h4 id="3empty-else-block">3、empty else block</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptyElseBlockRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where a else statement does nothing.</p>
  
  <p>简单解释：空的<code>else</code>检查。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">int</span> example(<span class="hljs-keyword">int</span> a)  {
        <span class="hljs-keyword">if</span> (<span class="hljs-number">1</span>)  {
            <span class="hljs-keyword">return</span> a + <span class="hljs-number">1</span>;
        }  <span class="hljs-keyword">else</span>  {               <span class="hljs-comment">// empty else statement, can be safely removed</span>
        }
    }</code></pre>



<h4 id="4empty-finally-statement">4、empty finally statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptyFinallyStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where a finally statement does nothing.</p>
  
  <p>简单解释：空的<code>finally</code>检查。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-keyword">void</span> example() {
        Foo *foo;
        <span class="hljs-keyword">@try</span> {
            [foo bar];
        }
        <span class="hljs-keyword">@catch</span>(<span class="hljs-built_in">NSException</span> *e) {
            <span class="hljs-built_in">NSLog</span>(@<span class="hljs-string">"Exception occurred: %@"</span>, [e description]);
        }
        <span class="hljs-keyword">@finally</span>            <span class="hljs-comment">// empty finally statement, probably forget to clean up?</span>
        {
        }
    }</code></pre>



<h4 id="5empty-for-statement">5、empty for statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptyForStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where a for statement does nothing.</p>
  
  <p>简单解释：空的<code>for</code>语句检查。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-keyword">void</span> example(<span class="hljs-built_in">NSArray</span> *array) {
        <span class="hljs-keyword">for</span> (;;)                <span class="hljs-comment">// empty for statement</span>
        {
        }
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">id</span> it in array)    <span class="hljs-comment">// empty for-each statement</span>
        {
        }
    }</code></pre>



<h4 id="6empty-if-statement">6、empty if statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.2</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptyIfStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where a condition is checked, but nothing is done about it.</p>
  
  <p>简单解释：空的<code>if</code>检查。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">if</span> (a == <span class="hljs-number">1</span>)                  <span class="hljs-comment">// empty if statement</span>
        {
        }
    }</code></pre>



<h4 id="7empty-switch-statement">7、empty switch statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptySwitchStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where a switch statement does nothing.</p>
  
  <p>简单解释：空的<code>switch</code>检查。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> i) {
        <span class="hljs-keyword">switch</span> (i)              <span class="hljs-comment">// empty switch statement</span>
        {
        }
    }</code></pre>



<h4 id="8empty-try-statement">8、empty try statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptyTryStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where a try statement is empty.</p>
  
  <p>简单解释：空的<code>try</code>检查。</p>
</blockquote>



<pre class="highlight"><code class=" hljs r">    void example() {
        <span class="hljs-keyword">try</span>                     // but this <span class="hljs-keyword">try</span> statement is empty
        {
        }
        catch(<span class="hljs-keyword">...</span>) {
            cout &lt;&lt; <span class="hljs-string">"Exception is caught!"</span>;
        }
    }
</code></pre>



<h4 id="9-empty-while-statement">9、 empty while statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/empty/EmptyWhileStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule detects instances where a while statement does nothing.</p>
  
  <p>简单解释：空的<code>while</code>检查。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a {
        <span class="hljs-keyword">while</span>(a--)              <span class="hljs-comment">// empty while statement</span>
        {
        }
    }</code></pre>    
    

# OCLint规则 Design 部分 


<h4 id="1avoid-default-arguments-on-virtual-methods">1、avoid default arguments on virtual methods</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.10.1</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/design/AvoidDefaultArgumentsOnVirtualMethodsRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Giving virtual functions default argument initializers tends to defeat polymorphism and introduce unnecessary com- plexity into a class hierarchy.</p>
  
  <p>简单解释：避免给虚函数设置默认参数，给虚函数设置默认参数会破坏多样性和引起不必要的层次结构发杂性。</p>
</blockquote>



<pre class="highlight"><code class=" hljs r">    class Foo
    {
    public:
        virtual ~Foo();
        virtual void a(int b = <span class="hljs-number">3</span>);
        // <span class="hljs-keyword">...</span>
    };
    class Bar : public Foo
    {
    public:
        void a(int b);
        // <span class="hljs-keyword">...</span>
    };
    Bar *bar = new Bar;
    Foo *foo = bar;
    foo-&gt;a();   // default of <span class="hljs-number">3</span>
    bar-&gt;a();   // compile time error!</code></pre>



<h4 id="2avoid-private-static-members">2、avoid private static members</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.10.1</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/design/AvoidPrivateStaticMembersRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Having static members is easier to harm encapsulation.</p>
  
  <p>简单解释：避免使用私有静态成员，静态成员很容易破换封装性</p>
</blockquote>



<pre class="highlight"><code class=" hljs vala">    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> {</span>
        <span class="hljs-keyword">static</span> <span class="hljs-keyword">int</span> a;       <span class="hljs-comment">// static field</span>
    };
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Bar</span> {</span>
        <span class="hljs-keyword">static</span> <span class="hljs-keyword">int</span> b();     <span class="hljs-comment">// static method</span>
    }</code></pre>          
    


# OCLint规则 Convention 部分 


<h4 id="1avoid-branching-statement-as-last-in-loop">1、avoid branching statement as last in loop</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.7</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/AvoidBranchingStatementAsLastInLoopRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Having branching statement as the last statement inside a loop is very confusing, and could largely be forgetting of something and turning into a bug.</p>
  
  <p>简单解释：不要再循环最后加入分支，负责理解起来比较困难，很大程度上会遗忘一些事情，导致一些错误。</p>
</blockquote>



<pre class="highlight"><code class=" hljs coffeescript">    <span class="hljs-reserved">void</span> example() {
        <span class="hljs-keyword">for</span> (int i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
            <span class="hljs-keyword">if</span> (foo(i)) {
                <span class="hljs-keyword">continue</span>;
            }
            <span class="hljs-keyword">break</span>;      <span class="hljs-regexp">//</span> <span class="hljs-keyword">this</span> <span class="hljs-keyword">break</span> <span class="hljs-keyword">is</span> confusing
        }
    }</code></pre>



<h4 id="2base-class-destructor-should-be-virtual-or-protected">2、base class destructor should be virtual or protected</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.10.2</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/BaseClassDestructorShouldBeVirtualOrProtectedRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Make base class destructor public and virtual, or protected and nonvirtual</p>
  
  <p>简单解释：基类的析构函数需要是<code>public</code>、<code>virtual</code>或者<code>protected``nonvirtual</code>。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    class Base {
    <span class="hljs-keyword">public</span>:
        ~<span class="hljs-title">Base</span>(); <span class="hljs-comment">// this should be either protected or virtual</span>
    }
    class C : <span class="hljs-keyword">public</span> Base {
        <span class="hljs-keyword">virtual</span> ~C();
    }</code></pre>

<p>Sutter &amp; Alexandrescu (November 2004). [<code>“C++ Coding Standards: 101 Rules, Guidelines, and Best Practices”</code>(<a href="http://gotw.ca/publications/c++cs.htm)]" rel="nofollow" target="_blank">http://gotw.ca/publications/c++cs.htm)]</a>. Addison-Wesley Professional</p>



<h4 id="3unnecessary-default-statement-in-covered-switch-statement">3、unnecessary default statement in covered switch statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/CoveredSwitchStatementsDontNeedDefaultRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>When a switch statement covers all possible cases, a default label is not needed and should be removed. If the switch is not fully covered, the SwitchStatements Should Have Default rule will report.</p>
  
  <p>简单解释：如果<code>switch</code>覆盖了所有的条件，<code>default</code>是不需要的应该被移除。如果不是<code>default</code>还是需要的。</p>
</blockquote>



<pre class="highlight"><code class=" hljs d">    <span class="hljs-keyword">typedef</span> <span class="hljs-keyword">enum</span> {
        value1 = <span class="hljs-number">0</span>,
        value2 = <span class="hljs-number">1</span>
    } eValues;
    <span class="hljs-comment">//</span>
    <span class="hljs-keyword">void</span> aMethod(eValues a)
    {
        <span class="hljs-keyword">switch</span>(a)
        {
            <span class="hljs-keyword">case</span> value1:
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> value2:
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:          <span class="hljs-comment">// this break is obsolete because all</span>
                <span class="hljs-keyword">break</span>;        <span class="hljs-comment">// values of variable a are already covered.</span>
        }
    }</code></pre>



<h4 id="4-ill-placed-default-label-in-switch-statement">4、 ill-placed default label in switch statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/DefaultLabelNotLastInSwitchStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>It is very confusing when default label is not the last label in a switch statement.</p>
  
  <p>简单解释：<code>default</code>应该在<code>switch</code>的最后，负责会很难理解。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">switch</span> (a) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:  <span class="hljs-comment">// the default case should be last</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                <span class="hljs-keyword">break</span>;
        }
    }</code></pre>



<h4 id="5destructor-of-virtual-class">5、destructor of virtual class</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/DestructorOfVirtualClassRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>This rule enforces the destructor of a virtual class must be virtual.</p>
  
  <p>简单解释：这个规则是虚拟类的析构函数必须是虚拟的。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    class Base { <span class="hljs-comment">// class Base should have a virtual destructor ~Base()</span>
        <span class="hljs-keyword">public</span>: <span class="hljs-keyword">virtual</span> <span class="hljs-keyword">void</span> <span class="hljs-title">f</span>();
    };
    class Child : <span class="hljs-keyword">public</span> Base {
        <span class="hljs-keyword">public</span>: ~<span class="hljs-title">Child</span>();  <span class="hljs-comment">// destructor ~Child() should be virtual</span>
    };</code></pre>



<h4 id="6inverted-logic">6、inverted logic</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.4</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/InvertedLogicRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>An inverted logic is hard to understand.</p>
  
  <p>简单解释：倒置逻辑不易理解。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">int</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">int</span> i;
        <span class="hljs-keyword">if</span> (a != <span class="hljs-number">0</span>)             <span class="hljs-comment">// if (a == 0)</span>
        {                       <span class="hljs-comment">// {</span>
            i = <span class="hljs-number">1</span>;              <span class="hljs-comment">//      i = 0;</span>
        }                       <span class="hljs-comment">// }</span>
        <span class="hljs-keyword">else</span>                    <span class="hljs-comment">// else</span>
        {                       <span class="hljs-comment">// {</span>
            i = <span class="hljs-number">0</span>;              <span class="hljs-comment">//      i = 1;</span>
        }                       <span class="hljs-comment">// }</span>
        <span class="hljs-keyword">return</span> !i ? -<span class="hljs-number">1</span> : <span class="hljs-number">1</span>;     <span class="hljs-comment">// return i ? 1 : -1;</span>
    }</code></pre>

<blockquote>
  <p><font color="red">PS：</font>在做判断的时候，应该先做的<code>是</code>判断，在做<code>非</code>的判断。做个一个测试如果只有非的测试是不会有警告的。</p>
</blockquote>



<pre class="highlight"><code class=" hljs mel">    <span class="hljs-keyword">int</span> example(<span class="hljs-keyword">int</span> <span class="hljs-keyword">condition</span>) {
        <span class="hljs-keyword">int</span> temp;
        <span class="hljs-keyword">if</span> (acondition!= <span class="hljs-number">0</span>)            <span class="hljs-comment">//不会有警告</span>
        {                       
            temp = <span class="hljs-number">1</span>;            
        }                  
    }</code></pre>



<h4 id="7missing-break-in-switch-statement">7、missing break in switch statement</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/MissingBreakInSwitchStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>A switch statement without a break statement has a very large chance to contribute a bug.</p>
  
  <p>简单解释：在<code>switch</code>语句中缺失了<code>break</code>，很有可能引发<code>bug</code>。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">switch</span> (a) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                <span class="hljs-comment">// do something</span>
            <span class="hljs-keyword">default</span>:
                <span class="hljs-keyword">break</span>;
        }
    }</code></pre>



<h4 id="8non-case-label-in-switch-statement-since06-定义类传送门点击">8、non case label in switch statement              &nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/NonCaseLabelInSwitchStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></h4>

<blockquote>
  <p>It is very confusing when label becomes part of the switch statement.</p>
  
  <p>简单解释：<code>label</code>出现在<code>switch</code>条件中不易理解。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">switch</span> (a) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                <span class="hljs-keyword">break</span>;
            label1:     <span class="hljs-comment">// label in a switch statement in really confusing</span>
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:
                <span class="hljs-keyword">break</span>;
        }
    }</code></pre>



<h4 id="9-ivar-assignment-outside-accessors-or-init-since08-定义类传送门点击">9、 ivar assignment outside accessors or init      &nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/ObjCAssignIvarOutsideAccessorsRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></h4>

<blockquote>
  <p>This rule prevents assigning an ivar outside of getters, setters, and init method.</p>
  
  <p>简单解释：检查某些成员的初始化不再<code>getters</code>、<code>setters</code> and<code>init method</code>中。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">Foo</span> : <span class="hljs-title">NSObject</span> {</span>
        <span class="hljs-keyword">int</span> _bar;
    }
    <span class="hljs-keyword">@property</span> (<span class="hljs-keyword">assign</span>, <span class="hljs-keyword">nonatomic</span>) <span class="hljs-keyword">int</span> bar;
    <span class="hljs-keyword">@end</span>
    <span class="hljs-class"><span class="hljs-keyword">@implementation</span> <span class="hljs-title">Foo</span></span>
    <span class="hljs-keyword">@synthesize</span> bar = _bar;
    - (<span class="hljs-keyword">void</span>)doSomething {
        _bar = <span class="hljs-number">3</span>; <span class="hljs-comment">// access _bar outside its getter, setter or init</span>
    }
    <span class="hljs-keyword">@end</span></code></pre>

<blockquote>
  <p><font color="red">PS：</font>简单和小伙伴讨论了下，感觉iOS开发并不是很适合。</p>
</blockquote>



<h4 id="10parameter-reassignment-since06-定义类传送门点击">10、parameter reassignment             &nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/ParameterReassignmentRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></h4>

<blockquote>
  <p>Reassigning values to parameters is very problematic in most cases.</p>
  
  <p>简单解释：对参数进行重新赋值，在很多情况下是有问题的。</p>
</blockquote>



<pre class="highlight"><code class=" hljs livecodeserver">    void example(int <span class="hljs-operator">a</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-operator">a</span> &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-operator">a</span> = <span class="hljs-number">0</span>;<span class="hljs-comment"> // reassign parameter a to 0</span>
        }
    }</code></pre>

<blockquote>
  <p><font color="red">PS：</font>简单测试了传值时使用指针，经测试不会有警告。也就是说不会对指针类型的参数做检查。</p>
</blockquote>



<h4 id="11prefer-early-exits-and-continue-since08-定义类传送门点击">11、prefer early exits and continue       &nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/PreferEarlyExitRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></h4>

<blockquote>
  <p>Early exits can reduce the indentation of a block of code, so that reader do not have to remember all the previous decisions, therefore, makes it easier to understand the code.</p>
  
  <p>简单解释：在有退出语句 的时候，应该让退出语句靠前，这样阅读代码使代码可以很好的被理解。</p>
</blockquote>



<pre class="highlight"><code class=" hljs r">    int *doSomething(int a) {
      <span class="hljs-keyword">if</span> (!foo(a) &amp;&amp; bar(a) &amp;&amp; doOtherThing(a)) {
        // <span class="hljs-keyword">...</span> some really long code ....
      }
      <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    }
    // is preferred as
    int *doSomething(int a) {
      <span class="hljs-keyword">if</span> (foo(a)) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
      }
      <span class="hljs-keyword">if</span> (!bar(a)) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
      }
      <span class="hljs-keyword">if</span> (!doOtherThing(a)) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
      }
      // <span class="hljs-keyword">...</span> some long code ....
    }</code></pre>



<h4 id="12-missing-default-in-switch-statements-since06-定义类传送门点击">12、 missing default in switch statements           &nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/SwitchStatementsShouldHaveDefaultRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></h4>

<blockquote>
  <p>Switch statements should have a default statement.</p>
  
  <p>简单解释：检查 <code>Switch</code>中<code>default</code>缺失的情况。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">switch</span> (a) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                <span class="hljs-keyword">break</span>;
            <span class="hljs-comment">// should have a default</span>
        }
    }</code></pre>



<h4 id="13-too-few-branches-in-switch-statement-since06-定义类传送门点击">13、 too few branches in switch statement             &nbsp; &nbsp; &nbsp;  <code>Since:0.6</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/convention/TooFewBranchesInSwitchStatementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></h4>

<blockquote>
  <p>To increase code readability, when a switch consists of only a few branches, it’s much better to use an if statement instead.</p>
  
  <p>简单解释：如果<code>switch</code>语句条件很少，可以一用<code>if else</code> 代替。</p>
</blockquote>



<pre class="highlight"><code class=" hljs cs">    <span class="hljs-keyword">void</span> example(<span class="hljs-keyword">int</span> a) {
        <span class="hljs-keyword">switch</span> (a) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:
                <span class="hljs-keyword">break</span>;
        } <span class="hljs-comment">// Better to use an if statement and check if variable a equals 1.</span>
    }</code></pre>

<blockquote>
  <p>Thresholds: <br>
  MINIMUM_CASES_IN_SWITCH The reporting threshold for count of case statements in a switch statement, de- <br>
  fault value is 3.</p>
</blockquote>



# OCLint规则 CoCoa 部分 


<h4 id="1missing-hash-method">1、missing hash method</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/cocoa/ObjCVerifyIsEqualHashRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>When isEqual method is overridden, hash method must be overridden, too.</p>
  
  <p>简单解释：<code>isEqual</code> 方法被重写, <code>hash</code> 方法也应该被重写.</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-class"><span class="hljs-keyword">@implementation</span> <span class="hljs-title">BaseObject</span></span>
    - (<span class="hljs-built_in">BOOL</span>)isEqual:(<span class="hljs-keyword">id</span>)obj {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">YES</span>;
    }
    <span class="hljs-comment">/*
    - (int)hash is missing; If you override isEqual you must override hash too.
    */</span>
    <span class="hljs-keyword">@end</span></code></pre>



<h4 id="2missing-call-to-base-method">2、missing call to base method</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/cocoa/ObjCVerifyMustCallSuperRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>When a method is declared with <strong>attribute</strong>((annotate(“oclint:enforce[base method]”))) annotation, all of its implementations (including its own and its sub classes) must call the method implementation in super class.</p>
  
  <p>简单解释：当使用 <code>__attribute__((annotate("oclint:enforce[must call super]")))</code> 注解时, 他的所有实现（包括他自己和子类）都必须调用超类的实现</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">UIView</span> (<span class="hljs-title">OCLintStaticChecks</span>)</span>
    - (<span class="hljs-keyword">void</span>)layoutSubviews __attribute__((annotate(<span class="hljs-string">"oclint:enforce[must call super]"</span>)));
    <span class="hljs-keyword">@end</span>
    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">CustomView</span> : <span class="hljs-title">UIView</span></span>
    <span class="hljs-keyword">@end</span>
    <span class="hljs-class"><span class="hljs-keyword">@implementation</span> <span class="hljs-title">CustomView</span></span>
    - (<span class="hljs-keyword">void</span>)layoutSubviews {
        <span class="hljs-comment">// [super layoutSubviews]; is enforced here</span>
    }
    <span class="hljs-keyword">@end</span></code></pre>



<h4 id="3calling-prohibited-method">3、calling prohibited method</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.10.1</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/cocoa/ObjCVerifyProhibitedCallRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>hen a method is declared with <strong>attribute</strong>((annotate(“oclint:enforce[prohibited method]”))) annotation, all of its usages will be prohibited.</p>
  
  <p>简单解释：当一个方法标记<code>__attribute__((annotate("oclint:enforce[prohibited call]")))</code>注解,所有的引用都将被禁止。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">A</span> : <span class="hljs-title">NSObject</span></span>
    - (<span class="hljs-keyword">void</span>)foo __attribute__((annotate(<span class="hljs-string">"oclint:enforce[prohibited call]"</span>)));
    <span class="hljs-keyword">@end</span>
    <span class="hljs-class"><span class="hljs-keyword">@implementation</span> <span class="hljs-title">A</span></span>
    - (<span class="hljs-keyword">void</span>)foo {
    }
    - (<span class="hljs-keyword">void</span>)bar {
        [<span class="hljs-keyword">self</span> foo]; <span class="hljs-comment">// calling method `foo` is prohibited.</span>
    }
    <span class="hljs-keyword">@end</span></code></pre>



<h4 id="4calling-protected-method">4、calling protected method</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/cocoa/ObjCVerifyProtectedMethodRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Even though there is no <code>protected</code> in Objective-C language level, in a design’s perspective, we sometimes hope to enforce a method only be used inside the class itself or by its subclass. This rule mimics the protected behavior, and alerts developers when a method is called outside its access scope.</p>
  
  <p>简单解释：在<code>Objective-C</code> 中虽然没有<code>protected</code>这个概念。但是在设计的角度，我们有时希望一个方法只希望被它自己或者它的子类调用。这个方法可以模仿<code>protected</code>在有人调用的时候给一个警告。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">A</span> : <span class="hljs-title">NSObject</span></span>
    - (<span class="hljs-keyword">void</span>)foo __attribute__((annotate(<span class="hljs-string">"oclint:enforce[protected method]"</span>)));
    <span class="hljs-keyword">@end</span>
    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">B</span> : <span class="hljs-title">NSObject</span></span>
    <span class="hljs-keyword">@property</span> (<span class="hljs-keyword">strong</span>, <span class="hljs-keyword">nonatomic</span>) A* a;
    <span class="hljs-keyword">@end</span>
     <span class="hljs-comment">//</span>
    <span class="hljs-class"><span class="hljs-keyword">@implementation</span> <span class="hljs-title">B</span></span>
    - (<span class="hljs-keyword">void</span>)bar {
        [<span class="hljs-keyword">self</span><span class="hljs-variable">.a</span> foo]; <span class="hljs-comment">// calling protected method foo from outside A and its subclasses</span>
    }
    <span class="hljs-keyword">@end</span></code></pre>



<h4 id="5missing-abstract-method-implementation">5、missing abstract method implementation</h4>

<p>&nbsp; &nbsp; &nbsp;  <code>Since:0.8</code> <a href="https://github.com/oclint/oclint/blob/master/oclint-rules/rules/cocoa/ObjCVerifySubclassMustImplementRule.cpp" rel="nofollow" target="_blank">定义类传送门～点击</a></p>

<blockquote>
  <p>Due to the Objective-C language tries to postpone the decision makings to the runtime as much as possible, an abstract method is okay to be declared but without implementations. This rule tries to verify the subclass implement the correct abstract method.</p>
  
  <p>简单解释：由于<code>Objective</code>的<code>runtime</code>特性，抽象方法可以被声明，可以不实现，该规则验证子类是否正确实现抽象方法。</p>
</blockquote>



<pre class="highlight"><code class=" hljs objectivec">    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">Parent</span></span>
    <span class="hljs-comment">//</span>
    - (<span class="hljs-keyword">void</span>)anAbstractMethod __attribute__((annotate(<span class="hljs-string">"oclint:enforce[subclass must implement]"</span>)));
    <span class="hljs-comment">//</span>
    <span class="hljs-keyword">@end</span>
    <span class="hljs-class"><span class="hljs-keyword">@interface</span> <span class="hljs-title">Child</span> : <span class="hljs-title">Parent</span></span>
    <span class="hljs-keyword">@end</span>
    <span class="hljs-comment">//</span>
    <span class="hljs-class"><span class="hljs-keyword">@implementation</span> <span class="hljs-title">Child</span></span>
    <span class="hljs-comment">/*
    // Child, as a subclass of Parent, must implement anAbstractMethod
    - (void)anAbstractMethod {}
    */</span>
    <span class="hljs-keyword">@end</span></code></pre>            




参考资料：https://blog.csdn.net/foolsong/article/details/76474125
**将上文中所有规则汇聚在一个页面中，方便搜索。**



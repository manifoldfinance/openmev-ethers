'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web = require('@ethersproject/web');
var keccak256 = require('@ethersproject/keccak256');
var providers = require('@ethersproject/providers');
var bignumber = require('@ethersproject/bignumber');
var transactions = require('@ethersproject/transactions');
var strings = require('@ethersproject/strings');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

function id(text) {
  return keccak256.keccak256(strings.toUtf8Bytes(text));
}
var DEFAULT_FLASHBOTS_ENDPOINT = 'https://relay.flashbots.net';
var DEFAULT_ETHERMINE_ENDPOINT = 'https://mev-relay.ethermine.org/';
var DEFAULT_OPENMEV_ENDPOINT_PROVIDER = 'https://api.openmev.net:10001/v1/public/provider';
var SystemConfigId;

(function (SystemConfigId) {
  SystemConfigId[SystemConfigId["CONFIG_MINER_RELAY"] = 0] = "CONFIG_MINER_RELAY";
  SystemConfigId[SystemConfigId["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SystemConfigId || (SystemConfigId = {}));

function systemConfigIdFromJSON(object) {
  switch (object) {
    case 0:
    case 'CONFIG_MINER_RELAY':
      return SystemConfigId.CONFIG_MINER_RELAY;

    case -1:
    case 'UNRECOGNIZED':
    default:
      return SystemConfigId.UNRECOGNIZED;
  }
}
function systemConfigIdToJSON(object) {
  switch (object) {
    case SystemConfigId.CONFIG_MINER_RELAY:
      return 'CONFIG_MINER_RELAY';

    default:
      return 'UNKNOWN';
  }
} // @TODO add additional SourceIds
//    openmev, keeper, secret

var BundleSourceId;

(function (BundleSourceId) {
  BundleSourceId[BundleSourceId["BATCH_BUNDLER"] = 0] = "BATCH_BUNDLER";
  BundleSourceId[BundleSourceId["KDB"] = 1] = "KDB";
  BundleSourceId[BundleSourceId["UNREC"] = 2] = "UNREC";
})(BundleSourceId || (BundleSourceId = {}));

var FlashbotsBundleResolution;

(function (FlashbotsBundleResolution) {
  FlashbotsBundleResolution[FlashbotsBundleResolution["BundleIncluded"] = 0] = "BundleIncluded";
  FlashbotsBundleResolution[FlashbotsBundleResolution["BlockPassedWithoutInclusion"] = 1] = "BlockPassedWithoutInclusion";
  FlashbotsBundleResolution[FlashbotsBundleResolution["AccountNonceTooHigh"] = 2] = "AccountNonceTooHigh";
})(FlashbotsBundleResolution || (FlashbotsBundleResolution = {}));

var TIMEOUT_MS = 5 * 60 * 1000;
var FlashbotsBundleProvider = /*#__PURE__*/function (_providers$JsonRpcPro) {
  _inheritsLoose(FlashbotsBundleProvider, _providers$JsonRpcPro);

  function FlashbotsBundleProvider(genericProvider, authSigner, connectionInfoOrUrl, network) {
    var _this;

    _this = _providers$JsonRpcPro.call(this, connectionInfoOrUrl, network) || this;
    _this.genericProvider = genericProvider;
    _this.authSigner = authSigner;
    _this.connectionInfo = connectionInfoOrUrl;
    return _this;
  }

  FlashbotsBundleProvider.throttleCallback = /*#__PURE__*/function () {
    var _throttleCallback = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.warn('🆘 Warning: Rate limited');
              return _context.abrupt("return", false);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function throttleCallback() {
      return _throttleCallback.apply(this, arguments);
    }

    return throttleCallback;
  }();

  FlashbotsBundleProvider.create = /*#__PURE__*/function () {
    var _create = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(genericProvider, authSigner, connectionInfoOrUrl, network) {
      var connectionInfo, networkish;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              connectionInfo = typeof connectionInfoOrUrl === 'string' || typeof connectionInfoOrUrl === 'undefined' ? {
                url: connectionInfoOrUrl || DEFAULT_OPENMEV_ENDPOINT_PROVIDER
              } : _extends({}, connectionInfoOrUrl);
              if (connectionInfo.headers === undefined) connectionInfo.headers = {};
              connectionInfo.throttleCallback = FlashbotsBundleProvider.throttleCallback;
              networkish = {
                chainId: 0,
                name: ''
              };

              if (typeof network === 'string') {
                networkish.name = network;
              } else if (typeof network === 'number') {
                networkish.chainId = network;
              } else if (typeof network === 'object') {
                networkish.name = network.name;
                networkish.chainId = network.chainId;
              }

              if (!(networkish.chainId === 0)) {
                _context2.next = 9;
                break;
              }

              _context2.next = 8;
              return genericProvider.getNetwork();

            case 8:
              networkish.chainId = _context2.sent.chainId;

            case 9:
              return _context2.abrupt("return", new FlashbotsBundleProvider(genericProvider, authSigner, connectionInfo, networkish));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function create(_x, _x2, _x3, _x4) {
      return _create.apply(this, arguments);
    }

    return create;
  }();

  FlashbotsBundleProvider.getMaxBaseFeeInFutureBlock = function getMaxBaseFeeInFutureBlock(baseFee, blocksInFuture) {
    var maxBaseFee = bignumber.BigNumber.from(baseFee);

    for (var i = 0; i < blocksInFuture; i++) {
      maxBaseFee = maxBaseFee.mul(1125).div(1000).add(1);
    }

    return maxBaseFee;
  };

  var _proto = FlashbotsBundleProvider.prototype;

  _proto.sendRawBundle = /*#__PURE__*/function () {
    var _sendRawBundle = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(signedBundledTransactions, targetBlockNumber, opts) {
      var _this2 = this;

      var params, request, response, bundleTransactions;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = {
                txs: signedBundledTransactions,
                blockNumber: "0x" + targetBlockNumber.toString(16),
                minTimestamp: opts == null ? void 0 : opts.minTimestamp,
                maxTimestamp: opts == null ? void 0 : opts.maxTimestamp,
                revertingTxHashes: opts == null ? void 0 : opts.revertingTxHashes
              };
              request = JSON.stringify(this.prepareBundleRequest('eth_sendBundle', [params]));
              _context3.next = 4;
              return this.request(request);

            case 4:
              response = _context3.sent;

              if (!(response.error !== undefined && response.error !== null)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", {
                error: {
                  message: response.error.message,
                  code: response.error.code
                }
              });

            case 7:
              bundleTransactions = signedBundledTransactions.map(function (signedTransaction) {
                var transactionDetails = transactions.parse(signedTransaction);
                return {
                  signedTransaction: signedTransaction,
                  hash: keccak256.keccak256(signedTransaction),
                  account: transactionDetails.from || '0x0',
                  nonce: transactionDetails.nonce
                };
              });
              return _context3.abrupt("return", {
                bundleTransactions: bundleTransactions,
                wait: function wait() {
                  return _this2.wait(bundleTransactions, targetBlockNumber, TIMEOUT_MS);
                },
                simulate: function simulate() {
                  return _this2.simulate(bundleTransactions.map(function (tx) {
                    return tx.signedTransaction;
                  }), targetBlockNumber, undefined, opts == null ? void 0 : opts.minTimestamp);
                },
                receipts: function receipts() {
                  return _this2.fetchReceipts(bundleTransactions);
                }
              });

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function sendRawBundle(_x5, _x6, _x7) {
      return _sendRawBundle.apply(this, arguments);
    }

    return sendRawBundle;
  }();

  _proto.sendBundle = /*#__PURE__*/function () {
    var _sendBundle = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(bundledTransactions, targetBlockNumber, opts) {
      var signedTransactions;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.signBundle(bundledTransactions);

            case 2:
              signedTransactions = _context4.sent;
              return _context4.abrupt("return", this.sendRawBundle(signedTransactions, targetBlockNumber, opts));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function sendBundle(_x8, _x9, _x10) {
      return _sendBundle.apply(this, arguments);
    }

    return sendBundle;
  }();

  _proto.signBundle = /*#__PURE__*/function () {
    var _signBundle = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(bundledTransactions) {
      var nonces, signedTransactions, _iterator, _step, tx, transactionDetails, transaction, address, nonce;

      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              nonces = {};
              signedTransactions = new Array();
              _iterator = _createForOfIteratorHelperLoose(bundledTransactions);

            case 3:
              if ((_step = _iterator()).done) {
                _context5.next = 47;
                break;
              }

              tx = _step.value;

              if (!('signedTransaction' in tx)) {
                _context5.next = 13;
                break;
              }

              /** @note In case someone is mixing pre-signed and signing transactions, decode to add to nonce object */
              transactionDetails = transactions.parse(tx.signedTransaction);

              if (!(transactionDetails.from === undefined)) {
                _context5.next = 9;
                break;
              }

              throw new Error('❌ Error: unable to decode signed transaction');

            case 9:
              console.log(Error);
              nonces[transactionDetails.from] = bignumber.BigNumber.from(transactionDetails.nonce + 1);
              signedTransactions.push(tx.signedTransaction);
              return _context5.abrupt("continue", 45);

            case 13:
              transaction = _extends({}, tx.transaction);
              _context5.next = 16;
              return tx.signer.getAddress();

            case 16:
              address = _context5.sent;

              if (!(typeof transaction.nonce === 'string')) {
                _context5.next = 19;
                break;
              }

              throw new Error('❌ Error: Bad nonce');

            case 19:
              console.log(Error);

              if (!(transaction.nonce !== undefined)) {
                _context5.next = 24;
                break;
              }

              _context5.t0 = bignumber.BigNumber.from(transaction.nonce);
              _context5.next = 32;
              break;

            case 24:
              _context5.t1 = nonces[address];

              if (_context5.t1) {
                _context5.next = 31;
                break;
              }

              _context5.t2 = bignumber.BigNumber;
              _context5.next = 29;
              return this.genericProvider.getTransactionCount(address, 'latest');

            case 29:
              _context5.t3 = _context5.sent;
              _context5.t1 = _context5.t2.from.call(_context5.t2, _context5.t3);

            case 31:
              _context5.t0 = _context5.t1;

            case 32:
              nonce = _context5.t0;
              nonces[address] = nonce.add(1);
              if (transaction.nonce === undefined) transaction.nonce = nonce;
              if ((transaction.type == null || transaction.type == 0) && transaction.gasPrice === undefined) transaction.gasPrice = bignumber.BigNumber.from(0);

              if (!(transaction.gasLimit === undefined)) {
                _context5.next = 40;
                break;
              }

              _context5.next = 39;
              return tx.signer.estimateGas(transaction);

            case 39:
              transaction.gasLimit = _context5.sent;

            case 40:
              _context5.t4 = signedTransactions;
              _context5.next = 43;
              return tx.signer.signTransaction(transaction);

            case 43:
              _context5.t5 = _context5.sent;

              _context5.t4.push.call(_context5.t4, _context5.t5);

            case 45:
              _context5.next = 3;
              break;

            case 47:
              return _context5.abrupt("return", signedTransactions);

            case 48:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function signBundle(_x11) {
      return _signBundle.apply(this, arguments);
    }

    return signBundle;
  }();

  _proto.wait = function wait(transactionAccountNonces, targetBlockNumber, timeout) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      var timer = null;
      var done = false;
      var minimumNonceByAccount = transactionAccountNonces.reduce(function (acc, accountNonce) {
        if (accountNonce.nonce > 0 && (accountNonce.nonce || 0) < acc[accountNonce.account]) {
          acc[accountNonce.account] = accountNonce.nonce;
        }

        acc[accountNonce.account] = accountNonce.nonce;
        return acc;
      }, {});

      var handler = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(blockNumber) {
          var noncesValid, allNoncesValid, block, blockTransactionsHash, _iterator2, _step2, bt, bundleIncluded;

          return runtime_1.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (!(blockNumber < targetBlockNumber)) {
                    _context7.next = 10;
                    break;
                  }

                  _context7.next = 3;
                  return Promise.all(Object.entries(minimumNonceByAccount).map( /*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(_ref2) {
                      var account, nonce, transactionCount;
                      return runtime_1.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              account = _ref2[0], nonce = _ref2[1];
                              _context6.next = 3;
                              return _this3.genericProvider.getTransactionCount(account);

                            case 3:
                              transactionCount = _context6.sent;
                              return _context6.abrupt("return", nonce >= transactionCount);

                            case 5:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6);
                    }));

                    return function (_x13) {
                      return _ref3.apply(this, arguments);
                    };
                  }()));

                case 3:
                  noncesValid = _context7.sent;
                  allNoncesValid = noncesValid.every(Boolean);

                  if (!allNoncesValid) {
                    _context7.next = 7;
                    break;
                  }

                  return _context7.abrupt("return");

                case 7:
                  // target block not yet reached, but nonce has become invalid
                  resolve(FlashbotsBundleResolution.AccountNonceTooHigh);
                  _context7.next = 17;
                  break;

                case 10:
                  _context7.next = 12;
                  return _this3.genericProvider.getBlock(targetBlockNumber);

                case 12:
                  block = _context7.sent;
                  // check bundle against block:
                  blockTransactionsHash = {};

                  for (_iterator2 = _createForOfIteratorHelperLoose(block.transactions); !(_step2 = _iterator2()).done;) {
                    bt = _step2.value;
                    blockTransactionsHash[bt] = true;
                  }

                  bundleIncluded = transactionAccountNonces.every(function (transaction) {
                    return blockTransactionsHash[transaction.hash];
                  });
                  resolve(bundleIncluded ? FlashbotsBundleResolution.BundleIncluded : FlashbotsBundleResolution.BlockPassedWithoutInclusion);

                case 17:
                  if (timer) {
                    clearTimeout(timer);
                  }

                  if (!done) {
                    _context7.next = 20;
                    break;
                  }

                  return _context7.abrupt("return");

                case 20:
                  done = true;

                  _this3.genericProvider.removeListener('block', handler);

                case 22:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function handler(_x12) {
          return _ref.apply(this, arguments);
        };
      }();

      _this3.genericProvider.on('block', handler);

      if (typeof timeout === 'number' && timeout > 0) {
        timer = setTimeout(function () {
          if (done) {
            return;
          }

          timer = null;
          done = true;

          _this3.genericProvider.removeListener('block', handler);

          reject('❌ Rejected: Timed out');
          console.log(reject);
        }, timeout);

        if (timer.unref) {
          timer.unref();
        }
      }
    });
  };

  _proto.getUserStats = /*#__PURE__*/function () {
    var _getUserStats = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8() {
      var blockDetails, evmBlockNumber, params, request, response;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.genericProvider.getBlock('latest');

            case 2:
              blockDetails = _context8.sent;
              // @type radix
              evmBlockNumber = "0x" + blockDetails.number.toString(16);
              params = [evmBlockNumber];
              request = JSON.stringify(this.prepareBundleRequest('flashbots_getUserStats', params));
              _context8.next = 8;
              return this.request(request);

            case 8:
              response = _context8.sent;

              if (!(response.error !== undefined && response.error !== null)) {
                _context8.next = 11;
                break;
              }

              return _context8.abrupt("return", {
                error: {
                  message: response.error.message,
                  code: response.error.code
                }
              });

            case 11:
              return _context8.abrupt("return", response.result);

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getUserStats() {
      return _getUserStats.apply(this, arguments);
    }

    return getUserStats;
  }();

  _proto.getBundleStats = /*#__PURE__*/function () {
    var _getBundleStats = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(bundleHash, blockNumber) {
      var evmBlockNumber, params, request, response;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              evmBlockNumber = "0x" + blockNumber.toString(16);
              params = [{
                bundleHash: bundleHash,
                blockNumber: evmBlockNumber
              }];
              request = JSON.stringify(this.prepareBundleRequest('flashbots_getBundleStats', params));
              _context9.next = 5;
              return this.request(request);

            case 5:
              response = _context9.sent;

              if (!(response.error !== undefined && response.error !== null)) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", {
                error: {
                  message: response.error.message,
                  code: response.error.code
                }
              });

            case 8:
              return _context9.abrupt("return", response.result);

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function getBundleStats(_x14, _x15) {
      return _getBundleStats.apply(this, arguments);
    }

    return getBundleStats;
  }();

  _proto.simulate = /*#__PURE__*/function () {
    var _simulate = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(signedBundledTransactions, blockTag, stateBlockTag, blockTimestamp) {
      var evmBlockNumber, blockTagDetails, blockDetails, evmBlockStateNumber, params, request, response, callResult;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!(typeof blockTag === 'number')) {
                _context10.next = 4;
                break;
              }

              evmBlockNumber = "0x" + blockTag.toString(16);
              _context10.next = 16;
              break;

            case 4:
              _context10.next = 6;
              return this.genericProvider.getBlock(blockTag);

            case 6:
              blockTagDetails = _context10.sent;

              if (!(blockTagDetails !== null)) {
                _context10.next = 11;
                break;
              }

              _context10.t0 = blockTagDetails;
              _context10.next = 14;
              break;

            case 11:
              _context10.next = 13;
              return this.genericProvider.getBlock('latest');

            case 13:
              _context10.t0 = _context10.sent;

            case 14:
              blockDetails = _context10.t0;
              evmBlockNumber = "0x" + blockDetails.number.toString(16);

            case 16:
              if (typeof stateBlockTag === 'number') {
                evmBlockStateNumber = "0x" + stateBlockTag.toString(16);
              } else if (!stateBlockTag) {
                evmBlockStateNumber = 'latest';
              } else {
                evmBlockStateNumber = stateBlockTag;
              }

              params = [{
                txs: signedBundledTransactions,
                blockNumber: evmBlockNumber,
                stateBlockNumber: evmBlockStateNumber,
                timestamp: blockTimestamp
              }];
              request = JSON.stringify(this.prepareBundleRequest('eth_callBundle', params));
              _context10.next = 21;
              return this.request(request);

            case 21:
              response = _context10.sent;

              if (!(response.error !== undefined && response.error !== null)) {
                _context10.next = 24;
                break;
              }

              return _context10.abrupt("return", {
                error: {
                  message: response.error.message,
                  code: response.error.code
                }
              });

            case 24:
              callResult = response.result;
              return _context10.abrupt("return", {
                bundleHash: callResult.bundleHash,
                coinbaseDiff: bignumber.BigNumber.from(callResult.coinbaseDiff),
                results: callResult.results,
                totalGasUsed: callResult.results.reduce(function (a, b) {
                  return a + b.gasUsed;
                }, 0),
                firstRevert: callResult.results.find(function (txSim) {
                  return 'revert' in txSim;
                })
              });

            case 26:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function simulate(_x16, _x17, _x18, _x19) {
      return _simulate.apply(this, arguments);
    }

    return simulate;
  }();

  _proto.request = /*#__PURE__*/function () {
    var _request2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(_request) {
      var connectionInfo;
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              connectionInfo = _extends({}, this.connectionInfo);
              _context11.t0 = _extends;
              _context11.next = 4;
              return this.authSigner.getAddress();

            case 4:
              _context11.t1 = _context11.sent;
              _context11.t2 = _context11.t1 + ":";
              _context11.next = 8;
              return this.authSigner.signMessage(id(_request));

            case 8:
              _context11.t3 = _context11.sent;
              _context11.t4 = _context11.t2 + _context11.t3;
              _context11.t5 = {
                'X-Flashbots-Signature': _context11.t4
              };
              _context11.t6 = this.connectionInfo.headers;
              connectionInfo.headers = (0, _context11.t0)(_context11.t5, _context11.t6);
              return _context11.abrupt("return", web.fetchJson(connectionInfo, _request));

            case 14:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function request(_x20) {
      return _request2.apply(this, arguments);
    }

    return request;
  }();

  _proto.fetchReceipts = /*#__PURE__*/function () {
    var _fetchReceipts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(bundledTransactions) {
      var _this4 = this;

      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", Promise.all(bundledTransactions.map(function (bundledTransaction) {
                return _this4.genericProvider.getTransactionReceipt(bundledTransaction.hash);
              })));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    function fetchReceipts(_x21) {
      return _fetchReceipts.apply(this, arguments);
    }

    return fetchReceipts;
  }();

  _proto.prepareBundleRequest = function prepareBundleRequest(method, params) {
    return {
      method: method,
      params: params,
      id: this._nextId++,
      jsonrpc: '2.0'
    };
  };

  return FlashbotsBundleProvider;
}(providers.JsonRpcProvider);

var OpenMevProvider = {
  __proto__: null,
  id: id,
  DEFAULT_FLASHBOTS_ENDPOINT: DEFAULT_FLASHBOTS_ENDPOINT,
  DEFAULT_ETHERMINE_ENDPOINT: DEFAULT_ETHERMINE_ENDPOINT,
  DEFAULT_OPENMEV_ENDPOINT_PROVIDER: DEFAULT_OPENMEV_ENDPOINT_PROVIDER,
  get SystemConfigId () { return SystemConfigId; },
  systemConfigIdFromJSON: systemConfigIdFromJSON,
  systemConfigIdToJSON: systemConfigIdToJSON,
  get BundleSourceId () { return BundleSourceId; },
  get FlashbotsBundleResolution () { return FlashbotsBundleResolution; },
  FlashbotsBundleProvider: FlashbotsBundleProvider
};

/**
Copyright 2021 CommodityStream LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

exports.default = OpenMevProvider;
//# sourceMappingURL=ethers-provider.cjs.development.js.map

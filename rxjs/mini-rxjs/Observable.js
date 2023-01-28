function Observable(forEach) {
  this._forEach = forEach;
}

Observable.prototype = {
  forEach: function (onNext, onError, onCompleted) {
    if (typeof onNext === "function") {
      return this._forEach({
        onNext: onNext,
        onError: onError || function () {},
        onCompleted: onCompleted || function () {},
      });
    } else {
      // onNext is Observer: { onNext: Function, onError: Function, onCompleted: Function }
      return this._forEach(onNext);
    }
  },

  // 产生新的 Observable
  map: (projectionFunction) => {
    const self = this;
    return new Observable(function (observer) {
      return self.forEach(
        function onNext(x) {
          observer.onNext(projectionFunction(x));
        },
        function onError(e) {
          observer.onError(e);
        },
        function onCompleted() {
          observer.onCompleted();
        }
      );
    });
  },

  filter(projectionFunction) {
    const self = this;
    return new Observable(function (observer) {
      return self.forEach(
        function onNext(x) {
          if (projectionFunction(x)) observer.onNext(x);
        },
        function onError(e) {
          observer.onError(e);
        },
        function onCompleted() {
          observer.onCompleted();
        }
      );
    });
  },

  take(num) {
    let counter = 0;
    const self = this;
    return new Observable(function (observer) {
      const subscription = self.forEach(
        function onNext(x) { 
          observer.onNext(x);
          counter++;
          if(counter === num) {
            observer.onCompleted();
            subscription.dispose();
          }
        },
        function onError(e) {
          observer.onError(e);
        },
        function onCompleted() {
          observer.onCompleted();
        }
      )
      return subscription;
    })
  }
};

Observable.fromEvent = function (dom, eventName) {
  return new Observable(function forEach(observer) {
    const handler = (e) => observer.onNext(e);
    dom.addEventListener(eventName, handler);

    return {
      dispose: dom.removeEventListener(eventName, handler),
    };
  });
};

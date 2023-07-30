Basically a nestJs app with graphl and yoga on top ;)

```
query{
	cats {...{firstName, id}}
}

query{
	cat(id: 1) {
    firstName
  }
}
```

<div class='flex-auto'>
    タグ：
    @foreach($question->tag as $tag)
        <a href='/home_t/{{ $tag->id }}' class='pr-4'>
              {{ $tag->name }}
        </a>
    @endforeach
</div>